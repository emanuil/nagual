var statsD = require('node-statsd');
var loadStubbedServers = require('./source/loadStubbedServers.js').loadStubbedServers;
var loadStubRules = require('./source/loadStubRules.js').loadStubRules;
var startHTTPServer = require('./source/startHTTPServer.js').startHTTPServer;
var startAllHTTPSServers = require('./source/startAllHTTPSServers.js').startAllHTTPSServers;

var servers, server, stubsCount, i;

// help
if(process.argv.indexOf('-h') !== -1) {
    console.log('Nagual usage: sudo node proxy.js [options]');
    console.log('\n');
    console.log('Options:');
    console.log('-q            don\'t output any data, show only exceptions');
    console.log('-s hostname   statsd server to log basic statistics');
    console.log('\n');
    process.exit();
}

// no console output with -q
if(process.argv.indexOf('-q') !== -1) {
    global.quiet = true;
}


// log to statsd -s server.name
if(process.argv.indexOf('-s') !== -1) {
    i = process.argv.indexOf('-s');

    global.statsDClient = new statsD({host: process.argv[i + 1]});
    global.statsDClient.increment('dummy_stat');

    global.statsDClient.socket.on('error', function(error) {
        global.statsDClient = false;
        console.error('\nError when testing statsd connection. Statsd will remain disabled...\n', error, '\n');
    });
}

global.serversToStub = loadStubbedServers('stubs');
global.stubRules = loadStubRules();

console.log('\nStarting the HTTP(S) protocol simulator...');

startHTTPServer();
startAllHTTPSServers();

servers = Object.keys(global.stubRules);
console.log('Loaded stubs count per host:\n');

for(i = 0; i < servers.length; i++) {
    server = servers[i];
    stubsCount = global.stubRules[server].length;

    if(stubsCount > 0) {
        console.log(server + ': ' + global.stubRules[server].length);
    } else {
        console.log(server + ': ' + global.stubRules[server].length + ' Transparent mode only!');
    }
}

console.log('\n');


