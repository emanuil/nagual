var handleRequest = require('../../../source/handleRequest.js').handleRequest;
var object = require('../../../source/handleRequest.js');

var passThrough = require('stream').PassThrough;

describe('handleRequestTest', function() {

    it('Handle GET request', function() {

        var request = new passThrough();
        var response = {};

        request.method = 'GET';
        request.headers = {'content-type': 'JSON'};

        spyOn(object, 'returnResponse');

        handleRequest(request, response);

        request.emit('data', new Buffer('123'));
        request.emit('data', new Buffer('456'));
        request.emit('end');

        expect(object.returnResponse).toHaveBeenCalledWith(request, response, object.formatResponse);
        expect(object.returnResponse.calls.mostRecent().args[0].body).toBeUndefined();
    });


    it('Handle HEAD request', function() {

        var request = new passThrough();
        var response = {};

        request.method = 'head';
        request.headers = {'content-type': 'JSON'};

        spyOn(object, 'returnResponse');

        handleRequest(request, response);

        request.emit('data', new Buffer('123'));
        request.emit('data', new Buffer('456'));
        request.emit('end');

        expect(object.returnResponse).toHaveBeenCalledWith(request, response, object.formatResponse);
        expect(object.returnResponse.calls.mostRecent().args[0].body).toBeUndefined();

    });


    it('Handle POST request', function() {

        var request = new passThrough();
        var response = {};

        request.method = 'POST';
        request.headers = {'content-type': 'JSON'};

        spyOn(object, 'returnResponse');

        handleRequest(request, response);

        request.emit('data', new Buffer('123'));
        request.emit('data', new Buffer('456'));
        request.emit('end');

        expect(object.returnResponse).toHaveBeenCalledWith(request, response, object.formatResponse);
        expect(object.returnResponse.calls.mostRecent().args[0].body).toEqual(new Buffer('123456'));

    });


    it('Handle PUT request', function() {

        var request = new passThrough();
        var response = {};

        request.method = 'PUT';
        request.headers = {'content-type': 'JSON'};

        spyOn(object, 'returnResponse');

        handleRequest(request, response);

        request.emit('data', new Buffer('123'));
        request.emit('data', new Buffer('456'));
        request.emit('end');

        expect(object.returnResponse).toHaveBeenCalledWith(request, response, object.formatResponse);
        expect(object.returnResponse.calls.mostRecent().args[0].body).toEqual(new Buffer('123456'));

    });


    it('Handle DELETE request', function() {

        var request = new passThrough();
        var response = {};

        request.method = 'delete';
        request.headers = {'content-type': 'JSON'};

        spyOn(object, 'returnResponse');

        handleRequest(request, response);

        request.emit('data', new Buffer('123'));
        request.emit('data', new Buffer('456'));
        request.emit('end');

        expect(object.returnResponse).toHaveBeenCalledWith(request, response, object.formatResponse);
        expect(object.returnResponse.calls.mostRecent().args[0].body).toEqual(new Buffer('123456'));

    });

});