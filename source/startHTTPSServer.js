var https = require('https');
var handleRequest = require('./handleRequest.js').handleRequest;

function startHTTPSServer(contexts) {

    var httpsServer = https.createServer({}, function(req, res) {

        handleRequest(req, res);
    });

    global.serversToStub.https.forEach(function(server) {
        httpsServer.addContext(server, contexts[server]);
    });

    httpsServer.listen(443, function() {
        console.log('Listening on port 443');
    });

    httpsServer.on('error', function(error) {
        console.log('\n');
        console.log('--------ERROR-------- ' + Date());
        console.log('HTTPS Server error');
        console.log(error);
        console.log(error.stack);
        console.log('--------ERROR-------- ' + Date());
        console.log('\n');
    });

}

module.exports.startHTTPSServer = startHTTPSServer;