var makeId = require('../../../source/returnResponse.js').makeId;

describe('makeIdTest', function() {

    it('The random id length is 8 characters', function() {

        var result = makeId();

        expect(result.length).toBe(8);

    });


    it('The random id is string', function() {

        var result = makeId();

        expect(typeof result).toBe('string');
    });


    it('Two subsequent calls return different result', function() {

        var firstResult = makeId();
        var secondResult = makeId();

        expect(firstResult).not.toEqual(secondResult);
    });

});