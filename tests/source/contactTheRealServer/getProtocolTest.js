var getProtocol = require('../../../source/contactTheRealServer.js').getProtocol;


describe('removePortFromHostTest', function() {

    it('HTTPS protocol', function () {
        var result = getProtocol(true);

        expect(result.globalAgent.protocol).toBe('https:');
    });


    it('HTTP protocol', function () {
        var result = getProtocol(false);

        expect(result.globalAgent.protocol).toBe('http:');
    });


});