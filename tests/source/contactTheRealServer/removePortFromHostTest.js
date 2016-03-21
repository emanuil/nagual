var removePortFromHost = require('../../../source/contactTheRealServer.js').removePortFromHost;


describe('removePortFromHostTest', function() {

    it('Remove port if present', function () {

        var result = removePortFromHost('api.facebook.com:9876');
        expect(result).toBe('api.facebook.com');

    });


    it('No port is present', function () {

        var result = removePortFromHost('api.facebook.com');
        expect(result).toBe('api.facebook.com');

    });
});