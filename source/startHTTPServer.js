var http = require('http');
var handleRequest = require('./handleRequest.js').handleRequest;


function startHTTPServer() {

    var httpServer80 = http.createServer(function(req, res) {

        handleRequest(req, res);

    });

    httpServer80.listen(80, function() {
        console.log('Listening on port 80');
    });


    httpServer80.on('error', function(error) {
        console.log('\n');
        console.log('--------ERROR-------- ' + Date());
        console.log('HTTP Server error');
        console.log(error);
        console.log(error.stack);
        console.log('--------ERROR-------- ' + Date());
        console.log('\n');
    });
}

module.exports.startHTTPServer = startHTTPServer;