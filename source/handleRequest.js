var returnResponse = require('./returnResponse.js').returnResponse;
var formatResponse = require('./formatResponse.js').formatResponse;

function decodeAuthorizationHeader(headers) {

    var tmp;

    if(!headers.authorization) {
        return headers;
    }

    // only convert to plain text in case if the string is base64 encoded
    if(headers.authorization.indexOf('Basic') > -1) {
        tmp = headers.authorization.split(' ');
        headers['decoded-authorization'] = new Buffer(tmp[1], 'base64').toString();
    }

    return headers;
}


function handleRequest(req, res) {

    var body = [];

    req.headers = decodeAuthorizationHeader(req.headers);

    req.method = req.method.toLowerCase();

    if (req.method === 'post' || req.method === 'put' || req.method === 'delete') {

        req.on('data', function (chunk) {
            body.push(chunk);
        });

        req.on('end', function () {
            req.body = Buffer.concat(body);
            return module.exports.returnResponse(req, res, module.exports.formatResponse);
        });
    }

    if (req.method === 'get' || req.method === 'head') {
        return module.exports.returnResponse(req, res, module.exports.formatResponse);
    }
}

module.exports.handleRequest = handleRequest;
module.exports.returnResponse = returnResponse;
module.exports.formatResponse = formatResponse;
module.exports.decodeAuthorizationHeader = decodeAuthorizationHeader;