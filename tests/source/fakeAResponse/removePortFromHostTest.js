var removePortFromHost = require('../../../source/fakeAResponse.js').removePortFromHost;

describe('removePortFromHostTest', function() {

    it('The raw URL does not have a port - e.g it\'s just api.facebook.com', function() {

        var result = removePortFromHost('api.facebook.com');
        expect(result).toBe('api.facebook.com');

    });

    it('The raw URL does have a port - e.g api.internal.com:1817', function() {

        var result = removePortFromHost('api.internal.com:1817');
        expect(result).toBe('api.internal.com');

    });

});