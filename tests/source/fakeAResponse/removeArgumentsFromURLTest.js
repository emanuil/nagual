var removeArgumentsFromURL = require('../../../source/fakeAResponse.js').removeArgumentsFromURL;

describe('removePortFromURLTest', function() {

    it('The raw URL does not have arguments', function() {

        var result = removeArgumentsFromURL('/users');
        expect(result).toBe('/users');

    });

    it('The raw URL has arguments', function() {

        var result = removeArgumentsFromURL('/users?argument=blah');
        expect(result).toBe('/users');

    });

});