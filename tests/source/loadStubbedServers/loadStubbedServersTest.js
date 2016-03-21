var loadStubbedServers = require('../../../source/loadStubbedServers.js').loadStubbedServers;
var fs = require('../../../source/loadStubbedServers.js').fs;


describe('loadStubbedServersTest', function() {

    it('Throws exception when trying to load stub servers from non existent directory', function() {
        expect(function(){loadStubbedServers('non_existent_directory');}).
            toThrowError(/no such file or directory/);
    });


    it('Throws exception when reading stubs from empty directory', function() {
        spyOn(fs, 'readdirSync').and.returnValue([]);
        expect(function(){loadStubbedServers('empty_directory');}).
            toThrowError(/The empty_directory directory is empty!/);
    });


    it('Throws exception when stub directory is not HTTP nor HTTPS', function() {
        spyOn(fs, 'readdirSync').and.returnValue(['smtp']);
        expect(function(){loadStubbedServers('does_not_matter');}).
            toThrowError('This simulator supports only HTTP and HTTPS protocols');
    });


    it('Throws exception when one directory is HTTPS but the other is FTP', function() {
        spyOn(fs, 'readdirSync').and.returnValue(['https', 'ftp']);
        expect(function(){loadStubbedServers('does_not_matter');}).
            toThrowError('This simulator supports only HTTP and HTTPS protocols');
    });


    it('Throws exception when a protocol directory is empty', function() {


        spyOn(fs, 'readdirSync').and.returnValues(['https', 'http'], []);

        expect(function(){loadStubbedServers('does_not_matter');}).
            toThrowError('The https directory is empty!');
    });


    it('Loads all sub directories as stub servers', function() {

        var alreadyCalled, result;
        var httpsStubServers = ['api.facebook.com', 'api.twitter.com'];

        spyOn(fs, 'readdirSync').and.callFake(function() {

            if (alreadyCalled) {
                return httpsStubServers;
            }
            alreadyCalled = true;
            return ['https'];
        });

        result = loadStubbedServers('does_not_matter');

        expect(result.https).toEqual(httpsStubServers);

    });

});