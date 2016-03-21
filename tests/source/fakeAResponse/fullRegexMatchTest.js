var fullRegexMatch = require('../../../source/fakeAResponse.js').fullRegexMatch;

describe('fullRegexMatchTest', function() {

    it('The string matches the regex', function() {

        var result = fullRegexMatch(/\/users/,'/users');
        expect(result).toBe(true);

    });


    it('The string does not match regex', function() {

        var result = fullRegexMatch(/\/users/,'/users/');
        expect(result).toBe(false);

    });


    it('Match everything', function() {

        var result = fullRegexMatch(/.*/, '/bla/bla');
        expect(result).toBe(true);

    });
});