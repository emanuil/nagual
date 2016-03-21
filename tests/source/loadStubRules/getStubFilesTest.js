var getStubFiles = require('../../../source/loadStubRules.js').getStubFiles;
var fs = require('../../../source/loadStubRules.js').fs;


describe('getStubFilesTest', function() {

    it('Servers stub directory is empty; empty array is expected', function() {

        var result;

        spyOn(fs, 'readdirSync').and.returnValue([]);
        result = getStubFiles('https', 'api.facebook.com');
        expect(result).toEqual([]);

    });


    it('Servers stub directory has only JS files; all files are expected', function() {

        var files = ['1.js', '2.js', '3.js'];
        var result;

        spyOn(fs, 'readdirSync').and.returnValue(['1.js', '2.js', '3.js']);
        result = getStubFiles('https', 'api.facebook.com');
        expect(result).toEqual(files);
    });


    it('Servers stub directory has one JS and one non-JS file; only the JS file is expected', function() {

        var result;

        spyOn(fs, 'readdirSync').and.returnValue(['1.js', '2.txt']);
        result = getStubFiles('https', 'api.facebook.com');
        expect(result).toEqual(['1.js']);
    });
});