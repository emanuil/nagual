var https = require('https');
var http = require('http');


function logToStatsD(statusCode, request) {

    var hostnameArray;

    if(statusCode >= 400 && statusCode < 500) {
        if(global.statsDClient) {
            hostnameArray = request.headers.host.split('.');
            global.statsDClient.increment('simulator.400_errors.' + hostnameArray[hostnameArray.length - 2]);
        }
    }

    if(statusCode >= 500 && statusCode < 600) {
        if(global.statsDClient) {
            hostnameArray = request.headers.host.split('.');
            global.statsDClient.increment('simulator.500_errors.' + hostnameArray[hostnameArray.length - 2]);
        }
    }
}


function handleError(error, req) {
    var errorMessage = '', hostnameArray;

    if(process.env.NODE_ENV !== 'test') {
        errorMessage += '\n';
        errorMessage += '--------ERROR-------- ' + Date();
        errorMessage += 'An error communicating to: ' + req.headers.host;
        errorMessage += error;
        errorMessage += error.stack;
        errorMessage += '--------ERROR-------- ' + Date();
        errorMessage += '\n';

        console.log(errorMessage);

        if(global.statsDClient) {
            hostnameArray = req.headers.host.split('.');
            global.statsDClient.increment('simulator.timeouts.' + hostnameArray[hostnameArray.length - 2]);
        }
    }
}


function removePortFromHost(host) {

    if(host.indexOf(':') > -1) {
        return host.substring(0, host.indexOf(':'));
    }

    return host;
}


function removeDecodedAuthorizationHeader(headers) {

    if(headers['decoded-authorization']) {
        delete headers['decoded-authorization'];
        return headers;
    }

    return headers;
}


function getProtocol(isEncrypted) {

    if(isEncrypted) {
        return https;
    }

    return http;
}


function contactTheRealServer(req, callback) {

    var host, options, protocol, remoteServer;

    host = removePortFromHost(req.headers.host);
    req.headers = removeDecodedAuthorizationHeader(req.headers);

    options = {
        hostname: host,
        port: req.socket.localPort,
        path: req.url,
        method: req.method,
        headers: req.headers
    };

    protocol = getProtocol(req.connection.encrypted);

    remoteServer = protocol.request(options, function (remoteResponse) {

        var formattedResponse = {};
        var body = [];

        remoteResponse.on('data', function (data) {
            body.push(data);
        });

        remoteResponse.on('end', function () {
            formattedResponse.body = Buffer.concat(body);
            formattedResponse.headers = remoteResponse.headers;
            formattedResponse.statusCode = remoteResponse.statusCode;
            formattedResponse.statusMessage = remoteResponse.statusMessage;
            formattedResponse.realServer = true;
            formattedResponse.id = req.id;
            logToStatsD(remoteResponse.statusCode, req);
            callback(formattedResponse);
        });
    });


    if(req.body) {
        remoteServer.write(req.body);
    }

    remoteServer.on('error', function(error) {
        module.exports.handleError(error, req);

    });

    remoteServer.end();
}

module.exports.https = https;
module.exports.handleError = handleError;
module.exports.contactTheRealServer = contactTheRealServer;
module.exports.removePortFromHost = removePortFromHost;
module.exports.removeDecodedAuthorizationHeader = removeDecodedAuthorizationHeader;
module.exports.getProtocol = getProtocol;

