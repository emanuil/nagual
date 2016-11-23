var fs = require('fs');
var path = require('path');
var nodeCache = require('node-cache');


function getStubFiles(protocol, server) {
    var stubFiles = fs.readdirSync(path.join('./stubs/', protocol, server));
    // load only the .js files in the stub's directory
    stubFiles = stubFiles.filter(function (file) {
        return file.substr(file.length - 3) === '.js';
    });
    return stubFiles;
}


function localRequire(file) {
    return require(file);
}


function loadStubRules() {

    var stubRules = {};

    var storage;
    storage = new nodeCache();

    Object.keys(global.serversToStub).forEach(function(protocol) {
        global.serversToStub[protocol].forEach(function (server) {

            var stubFiles = module.exports.getStubFiles(protocol, server);

            stubRules[server] = [];

            stubFiles.forEach(function (stubFile) {

                var stub = module.exports.localRequire(path.join('../stubs/', protocol, server, stubFile));

                var initiatedStub = new stub(storage);

                // convert the pseudo regex to real Regex
                if (typeof initiatedStub.url === 'string' && initiatedStub.url.indexOf(':') > -1) {

                    initiatedStub.url = initiatedStub.url.replace(/\//g, '\\/');
                    initiatedStub.url = initiatedStub.url.replace(/:id/g, '[^/]*');
                    initiatedStub.url = initiatedStub.url.replace(/:string/g, '[a-zA-Z]*');
                    initiatedStub.url = initiatedStub.url.replace(/:number/g, '[0-9]*');

                    initiatedStub.url += '[^\/]*';

                    initiatedStub.url = new RegExp(initiatedStub.url, 'i');
                }

                stubRules[server].push(initiatedStub);
            });
        });
    });

    return stubRules;
}

module.exports.fs = fs;
module.exports.getStubFiles = getStubFiles;
module.exports.loadStubRules = loadStubRules;
module.exports.localRequire = localRequire;

