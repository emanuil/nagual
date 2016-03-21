var module = require('../../../source/loadStubRules.js');

describe('loadStubRulesTest', function() {

    it('The stub rule url is an Regex; don\'t change it', function() {

        var stubObject = function() {
            this.url = /blah/;
        };

        var result, server = 'api.twitter.com';
        global.serversToStub = {'http': [server]};

        spyOn(module, 'getStubFiles').and.returnValue(['1.js']);
        spyOn(module, 'localRequire').and.returnValue(stubObject);

        result = module.loadStubRules();

        expect(result[server][0].url).toEqual(new stubObject().url);

    });


    it('The stub rule url is a regular string; don\'t change it', function() {

        var stubObject = function() {
            this.url = '/users/timeline.json';
        };

        var result, server = 'api.twitter.com';
        global.serversToStub = {'http': [server]};

        spyOn(module, 'getStubFiles').and.returnValue(['1.js']);
        spyOn(module, 'localRequire').and.returnValue(stubObject);

        result = module.loadStubRules();

        expect(result[server][0].url).toEqual(new stubObject().url);

    });


    it('The stub rule url is a pseudo string with :id part at the end; create a real Regex', function() {

        var stubObject = function() {
            this.url = '/users/:id';
        };

        var result, server = 'api.twitter.com';
        global.serversToStub = {'http': [server]};

        spyOn(module, 'getStubFiles').and.returnValue(['1.js']);
        spyOn(module, 'localRequire').and.returnValue(stubObject);

        result = module.loadStubRules();

        expect(result[server][0].url).toEqual(/\/users\/[^\/]*[^\/]*/i);

    });


    it('The stub rule url is a pseudo string with :id part in the middle; create a real Regex', function() {

        var stubObject = function() {
            this.url = '/users/:id/comments';
        };

        var result, server = 'api.twitter.com';
        global.serversToStub = {'http': [server]};

        spyOn(module, 'getStubFiles').and.returnValue(['1.js']);
        spyOn(module, 'localRequire').and.returnValue(stubObject);

        result = module.loadStubRules();

        expect(result[server][0].url).toEqual(/\/users\/[^\/]*\/comments[^\/]*/i);

    });


    it('The stub rule url is a pseudo string with :id part in front; create a real Regex', function() {

        var stubObject = function() {
            this.url = '/:id/comments';
        };

        var result, server = 'api.twitter.com';
        global.serversToStub = {'http': [server]};

        spyOn(module, 'getStubFiles').and.returnValue(['1.js']);
        spyOn(module, 'localRequire').and.returnValue(stubObject);

        result = module.loadStubRules();

        expect(result[server][0].url).toEqual(/\/[^\/]*\/comments[^\/]*/i);

    });


    it('The stub rule url is a pseudo string with :string part at the end; create a real Regex', function() {

        var stubObject = function() {
            this.url = '/users/:string';
        };

        var result, server = 'api.twitter.com';
        global.serversToStub = {'http': [server]};

        spyOn(module, 'getStubFiles').and.returnValue(['1.js']);
        spyOn(module, 'localRequire').and.returnValue(stubObject);

        result = module.loadStubRules();

        expect(result[server][0].url).toEqual(/\/users\/[a-zA-Z]*[^\/]*/i);

    });


    it('The stub rule url is a pseudo string with :number part at the middle; create a real Regex', function() {

        var stubObject = function() {
            this.url = '/users/:number/posts';
        };

        var result, server = 'api.twitter.com';
        global.serversToStub = {'http': [server]};

        spyOn(module, 'getStubFiles').and.returnValue(['1.js']);
        spyOn(module, 'localRequire').and.returnValue(stubObject);

        result = module.loadStubRules();

        expect(result[server][0].url).toEqual(/\/users\/[0-9]*\/posts[^\/]*/i);

    });

});