var removeDecodedAuthorizationHeader = require('../../../source/contactTheRealServer.js').
    removeDecodedAuthorizationHeader;


describe('removePortFromHostTest', function() {

    it('Remove extra header', function () {

        var result, request;

        request = {
            'headers': {
                'decoded-authorization': 'bad user',
                'host': 'api.twitter.com'
            }
        };

        result = removeDecodedAuthorizationHeader(request);
        expect(result['decoded-authorization']).toBeUndefined();

    });


    it('No need to remove extra header', function () {

        var result, request;

        request = {
            'headers': {
                'host': 'api.twitter.com'
            }
        };

        result = removeDecodedAuthorizationHeader(request);
        expect(result).toBe(request);

    });

});