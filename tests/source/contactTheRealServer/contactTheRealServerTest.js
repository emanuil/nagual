var contactTheRealServer = require('../../../source/contactTheRealServer.js').contactTheRealServer;
var https = require('../../../source/contactTheRealServer.js').https;
var server = require('../../../source/contactTheRealServer.js');

var passThrough = require('stream').PassThrough;

process.env.NODE_ENV = 'test';

describe('contactTheRealServerTest', function() {

    it('Timeout when contacting the remote server', function () {

        var fakeRequest = new passThrough(), request;

        var error = {
            'message': 'timeout',
            'stack': 'some stack'
        };


        spyOn(server, 'handleError');

        spyOn(https, 'request').and.returnValue(fakeRequest);

        request = {
            'headers': {
                'host': 'api.yahoo.com'
            },
            'socket': {
                'localPort': 4433
            },
            'connection': {
                'encrypted': true
            }

        };

        contactTheRealServer(request, {});

        fakeRequest.emit('error', error);
        expect(server.handleError).toHaveBeenCalledWith(error, request);

    });


    it('Test body', function () {

        var fakeRequest = new passThrough(), request;


        spyOn(https, 'request').and.returnValue(fakeRequest);

        request = {
            'headers': {
                'host': 'api.yahoo.com'
            },
            'socket': {
                'localPort': 4433
            },
            'connection': {
                'encrypted': true
            }

        };

        contactTheRealServer(request, {});

        fakeRequest.emit('data', 'asd');
        fakeRequest.emit('end');


    });
});