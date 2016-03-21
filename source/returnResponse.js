var fakeAResponse = require('./fakeAResponse.js').fakeAResponse;
var contactTheRealServer = require('./contactTheRealServer.js').contactTheRealServer;


function printRequest(req) {

    var i, isAscii = true;

    if(global.statsDClient) {
        global.statsDClient.increment('simulator.all_requests');
    }

    if(global.quiet || process.env.NODE_ENV === 'test') {
        return;
    }

    console.log('--' + req.id + '--------REQUEST START----- ' + Date());

    console.log(req.headers.host);
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);

    // A simple way to detect if the encoding is ASCII or binary
    if(req.body) {
        console.log('has body');
        for (i = 0; i < req.body.length; i++) {
            if (req.body[i] > 127) {
                isAscii = false;
                break;
            }
        }

        if(isAscii) {
            req.body = req.body.toString();
            console.log(req.body.toString());
        } else{
            console.log('binary body');
        }
    }
    else {
        console.log('no body');
    }


    console.log('--' + req.id + '----------REQUEST END-------- ' + Date());
    console.log('\n');
}


function makeId() {
    var text = '', i;
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}


function returnResponse(req, res, callback) {

    var host = req.headers.host, fakedResponse;

    req.id = makeId();

    printRequest(req);

    fakedResponse = module.exports.fakeAResponse(host, req);

    if (fakedResponse) {
        return callback(res, fakedResponse);
    }

    module.exports.contactTheRealServer(req, function (realResponse) {
        return callback(res, realResponse);
    });

}

module.exports.returnResponse = returnResponse;
module.exports.contactTheRealServer = contactTheRealServer;
module.exports.fakeAResponse = fakeAResponse;
module.exports.makeId = makeId;