var fs = require('fs');
var path = require('path');

function loadStubbedServers(directory) {

    var result = {}, server;

    var protocols = fs.readdirSync(directory);

    if(protocols.length === 0) {
        throw new Error('The ' + directory + ' directory is empty!');
    }

    protocols.forEach(function (protocol) {

        if(protocol !== 'http' && protocol !== 'https') {
            throw new Error('This simulator supports only HTTP and HTTPS protocols');
        }

        result[protocol] = [];
        server = fs.readdirSync(path.join(directory, protocol));

        if(server.length === 0) {
            throw new Error('The ' + protocol + ' directory is empty!');
        }

        server.forEach(function (name) {
            result[protocol].push(name);
        });
    });

    return result;
}

// the fs export is only for unit testing purposes
module.exports.fs = fs;
module.exports.loadStubbedServers = loadStubbedServers;