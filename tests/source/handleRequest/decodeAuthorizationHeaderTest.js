var decodeAuthorizationHeader = require('../../../source/handleRequest.js').decodeAuthorizationHeader;

describe('decodeAuthorizationHeaderTest', function() {

    it('No authorization header', function() {

        var headers = {};

        var result = decodeAuthorizationHeader(headers);
        expect(result).toEqual({});

    });


    it('Custom (non base64 encoded) authorization header', function() {

        var headers = {
            'authorization': 'FIRE-TOKEN apikey="0PN5J17HBGZHT7JJ3X82"'
        };

        var result = decodeAuthorizationHeader(headers);
        expect(result).toEqual(headers);

    });


    it('Standard authorization header', function() {

        var headers = {
            'authorization': 'Basic QWxhZGRpbjpPcGVuU2VzYW1l'
        };

        var result = decodeAuthorizationHeader(headers);


        expect(result.authorization).toEqual(headers.authorization);
        expect(result['decoded-authorization']).toBe('Aladdin:OpenSesame');

    });

});