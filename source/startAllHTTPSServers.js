var pem = require('pem');
var fs = require('fs');
var startHTTPSServer = require('./startHTTPSServer.js').startHTTPSServer;

function startAllHTTPSServers() {

    var ca_root_cert = fs.readFileSync('root_certificate/rootCA.crt');
    var ca_root_key = fs.readFileSync('root_certificate/rootCA.key');

    var SNIContexts = {};

    global.serversToStub.https.forEach(function (server) {

        pem.createCertificate({
            serviceCertificate: ca_root_cert,
            serviceKey: ca_root_key,
            serial: Date.now(),
            days: 500,
            country: '',
            state: '',
            organization: '',
            commonName: server
        }, function (err, keys) {
            SNIContexts[server] = {
                key: keys.clientKey,
                cert: keys.certificate
            };

            // check if all needed certificates are generated
            if (Object.keys(SNIContexts).length === global.serversToStub.https.length) {
                startHTTPSServer(SNIContexts);
            }
        });
    });
}

module.exports.startAllHTTPSServers = startAllHTTPSServers;