var zlib = require('zlib');



function printBody(ourResponse) {
    var i, isAscii = true;

    if (ourResponse.headers && ourResponse.headers['content-encoding'] === 'gzip') {
        zlib.gunzip(ourResponse.body, function (err, dezipped) {
            return dezipped.toString();
        });
    } else {

        for (i = 0; i < ourResponse.body.length; i++) {
            if (ourResponse.body[i] > 127) {
                isAscii = false;
                break;
            }
        }

        if (isAscii) {
            return ourResponse.body.toString();
        }

        return 'binary body';

    }
}


function printResponse(ourResponse) {

    var result = '';

    if(global.quiet) {
        return;
    }

    if(ourResponse.realServer) {
        result += '--' + ourResponse.id + '--------REAL RESPONSE START----- ' + Date();
        result += '\n';
    } else {
        result += '--' + ourResponse.id + '--------FAKE RESPONSE START----- ' + Date();
        result += '\n';
    }

    if (ourResponse.statusCode) {
        result += ourResponse.statusCode;
        result += '\n';
    }

    if (ourResponse.statusMessage) {
        result += ourResponse.statusMessage;
        result += '\n';
    }


    if (ourResponse.headers) {
        result += JSON.stringify(ourResponse.headers);
        result += '\n';
    }

    // print the body
    if (ourResponse.body) {
        result += printBody(ourResponse);
        result += '\n';
    }

    if(ourResponse.realServer) {
        result += '--' + ourResponse.id + '----------REAL RESPONSE END------- ' + Date();
        result += '\n';
    } else {
        result += '--' + ourResponse.id + '----------FAKE RESPONSE END------- ' + Date();
        result += '\n';
    }


    result += '\n\n';
    console.log(result);


}


function formatResponse(clientResponse, ourResponse) {

    var key;

    if(ourResponse.statusCode) {
        clientResponse.statusCode = ourResponse.statusCode;
    }

    if(ourResponse.statusMessage) {
        clientResponse.statusMessage = ourResponse.statusMessage;
    }

    if(ourResponse.headers) {
        for (key in ourResponse.headers) {
            if (ourResponse.headers.hasOwnProperty(key)) {
                clientResponse.setHeader(key, ourResponse.headers[key]);
            }
        }
    }

    printResponse(ourResponse);

    return clientResponse.end(ourResponse.body);

}

module.exports.formatResponse = formatResponse;