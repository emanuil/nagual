var formatResponse = require('../../../source/formatResponse.js').formatResponse;

describe('fullRegexMatchTest', function() {

    it('Set status code', function() {

        var result, clientResponse, ourResponse;
        global.quiet = true;

        clientResponse = {
            'end': function() {
                return this;
            }
        };

        ourResponse = {
            'statusCode': 200
        };

        result = formatResponse(clientResponse, ourResponse);
        expect(result).toEqual(clientResponse);

        expect(result.statusCode).toEqual(ourResponse.statusCode);
        expect(result.statusMessage).toBeUndefined();
        expect(result.headers).toBeUndefined();
    });


    it('Set status message code', function() {

        var result, clientResponse, ourResponse;
        global.quiet = true;

        clientResponse = {
            'end': function() {
                return this;
            }
        };

        ourResponse = {
            'statusCode': 200,
            'statusMessage': 'Forbidden'
        };

        result = formatResponse(clientResponse, ourResponse);
        expect(result).toEqual(clientResponse);

        expect(result.statusCode).toEqual(ourResponse.statusCode);
        expect(result.statusMessage).toEqual(ourResponse.statusMessage);
        expect(result.headers).toBeUndefined();
    });


    it('Set headers', function() {

        var result, clientResponse, ourResponse;
        global.quiet = true;

        clientResponse = {
            'end': function() {
                return this;
            },
            'setHeader': function() {

            }
        };

        ourResponse = {
            'statusCode': 200,
            'headers': {
                'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='
            }
        };

        spyOn(clientResponse, 'setHeader');

        result = formatResponse(clientResponse, ourResponse);
        expect(result).toEqual(clientResponse);

        expect(result.statusCode).toEqual(ourResponse.statusCode);
        expect(result.statusMessage).toBeUndefined();
        expect(clientResponse.setHeader).toHaveBeenCalledWith('Authorization', ourResponse.headers.Authorization);
    });

});