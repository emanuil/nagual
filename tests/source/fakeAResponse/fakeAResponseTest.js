var fakeAResponse = require('../../../source/fakeAResponse.js').fakeAResponse;

describe('fakeAResponseTest', function() {

    it('There is no stub for the server in the request', function() {

        var result;
        global.stubRules = {
            'api.facebook.com': []
        };

        result = fakeAResponse('api.twitter.com', {});
        expect(result).toBe(false);

    });


    it('The stub count is zero for the server in the request', function() {

        var result;
        global.stubRules = {
            'api.twitter.com': []
        };

        result = fakeAResponse('api.twitter.com', {});
        expect(result).toBe(false);

    });


    it('Match stub rule by string URL and token in the headers', function() {

        var result, request = {}, expectedResult = 'good result';

        global.stubRules = {
            'api.facebook.com': [{
                'method': 'POST',
                'url': '/users',
                'token': {
                    'location': 'headers',
                    'string': 'test_token'
                },
                'getResponse': function(){return expectedResult;}
            }]

        };

        request.method = 'POST';
        request.url = '/users';
        request.headers = {
            'blah': 123,
            'authentication': 'blah test_token_123 blah'
        };

        result = fakeAResponse('api.facebook.com', request);
        expect(result).toBe(expectedResult);

    });


    it('No match stub rule by string URL and token in the headers', function() {

        var result, request = {}, expectedResult = 'good result';

        global.stubRules = {
            'api.facebook.com': [{
                'method': 'POST',
                'url': '/users',
                'token': {
                    'location': 'headers',
                    'string': 'test_tokens'
                },
                'getResponse': function(){return expectedResult;}
            }]

        };

        request.method = 'POST';
        request.url = '/users';
        request.headers = {
            'blah': 123,
            'authentication': 'blah test_token_123 blah'
        };

        result = fakeAResponse('api.facebook.com', request);
        expect(result).toBe(false);

    });


    it('Match stub rule by string URL and token in the url', function() {

        var result, request = {}, expectedResult = 'good result';

        global.stubRules = {
            'api.facebook.com': [{
                'method': 'get',
                'url': '/users',
                'token': {
                    'location': 'url',
                    'string': 'test_token'
                },
                'getResponse': function(){return expectedResult;}
            }]

        };

        request.method = 'GET';
        request.url = '/users?access_token=test_token_456';
        request.headers = {
            'blah': 123,
            'authentication': 'blah blah'
        };

        result = fakeAResponse('api.facebook.com', request);
        expect(result).toBe(expectedResult);

    });


    it('No match stub rule by string URL and token in the url', function() {

        var result, request = {}, expectedResult = 'good result';

        global.stubRules = {
            'api.facebook.com': [{
                'method': 'get',
                'url': '/users',
                'token': {
                    'location': 'url',
                    'string': 'test_token'
                },
                'getResponse': function(){return expectedResult;}
            }]

        };

        request.method = 'GET';
        request.url = '/users?access_token=real_token_456';
        request.headers = {
            'blah': 123,
            'authentication': 'blah blah'
        };

        result = fakeAResponse('api.facebook.com', request);
        expect(result).toBe(false);

    });


    it('Match stub rule by string URL and token in the body', function() {

        var result, request = {}, expectedResult = 'good result';

        global.stubRules = {
            'api.facebook.com': [{
                'method': 'PUT',
                'url': '/users',
                'token': {
                    'location': 'body',
                    'string': 'my%20post'
                },
                'getResponse': function(){return expectedResult;}
            }]

        };

        request.method = 'put';
        request.url = '/users?access_token=test_token_456';
        request.headers = {
            'blah': 123,
            'authentication': 'blah blah'
        };
        request.body = 'message=my%20post&time=today';

        result = fakeAResponse('api.facebook.com', request);
        expect(result).toBe(expectedResult);

    });


    it('No match stub rule by string URL and token in the body', function() {

        var result, request = {}, expectedResult = 'good result';

        global.stubRules = {
            'api.facebook.com': [{
                'method': 'PUT',
                'url': '/users',
                'token': {
                    'location': 'body',
                    'string': 'my%20postings'
                },
                'getResponse': function(){return expectedResult;}
            }]

        };

        request.method = 'put';
        request.url = '/users?access_token=test_token_456';
        request.headers = {
            'blah': 123,
            'authentication': 'blah blah'
        };
        request.body = 'message=my%20post&time=today';

        result = fakeAResponse('api.facebook.com', request);
        expect(result).toBe(false);

    });


    it('Match stub rule by regex URL and token in the headers', function() {

        var result, request = {}, expectedResult = 'good result';

        global.stubRules = {
            'api.facebook.com': [{
                'method': 'POST',
                'url': /\/users/,
                'token': {
                    'location': 'headers',
                    'string': 'test_token'
                },
                'getResponse': function(){return expectedResult;}
            }]

        };

        request.method = 'POST';
        request.url = '/users';
        request.headers = {
            'blah': 123,
            'authentication': 'blah test_token_123 blah'
        };

        result = fakeAResponse('api.facebook.com', request);
        expect(result).toBe(expectedResult);

    });


    it('No match stub rule by regex URL and token in the headers', function() {

        var result, request = {}, expectedResult = 'good result';

        global.stubRules = {
            'api.facebook.com': [{
                'method': 'POST',
                'url': /\/users/,
                'token': {
                    'location': 'headers',
                    'string': 'test_tokens'
                },
                'getResponse': function(){return expectedResult;}
            }]

        };

        request.method = 'POST';
        request.url = '/users';
        request.headers = {
            'blah': 123,
            'authentication': 'blah test_token_123 blah'
        };

        result = fakeAResponse('api.facebook.com', request);
        expect(result).toBe(false);

    });


    it('Match stub rule by regex URL and token in the url', function() {

        var result, request = {}, expectedResult = 'good result';

        global.stubRules = {
            'api.facebook.com': [{
                'method': 'get',
                'url': /\/users\/123/,
                'token': {
                    'location': 'url',
                    'string': 'test_token'
                },
                'getResponse': function(){return expectedResult;}
            }]

        };

        request.method = 'GET';
        request.url = '/users/123?access_token=test_token_456';
        request.headers = {
            'blah': 123,
            'authentication': 'blah blah'
        };

        result = fakeAResponse('api.facebook.com', request);
        expect(result).toBe(expectedResult);

    });


    it('No match stub rule by regex URL and token in the url', function() {

        var result, request = {}, expectedResult = 'good result';

        global.stubRules = {
            'api.facebook.com': [{
                'method': 'get',
                'url': /\/users\/123/,
                'token': {
                    'location': 'url',
                    'string': 'test_token'
                },
                'getResponse': function(){return expectedResult;}
            }]

        };

        request.method = 'GET';
        request.url = '/users/123?access_token=real_token_456';
        request.headers = {
            'blah': 123,
            'authentication': 'blah blah'
        };

        result = fakeAResponse('api.facebook.com', request);
        expect(result).toBe(false);

    });


    it('Match stub rule by regex URL and token in the body', function() {

        var result, request = {}, expectedResult = 'good result';

        global.stubRules = {
            'api.facebook.com': [{
                'method': 'PUT',
                'url': /\/users/,
                'token': {
                    'location': 'body',
                    'string': 'my%20post'
                },
                'getResponse': function(){return expectedResult;}
            }]

        };

        request.method = 'put';
        request.url = '/users?access_token=test_token_456';
        request.headers = {
            'blah': 123,
            'authentication': 'blah blah'
        };
        request.body = 'message=my%20post&time=today';

        result = fakeAResponse('api.facebook.com', request);
        expect(result).toBe(expectedResult);

    });


    it('No match stub rule by regex URL and token in the body', function() {

        var result, request = {}, expectedResult = 'good result';

        global.stubRules = {
            'api.facebook.com': [{
                'method': 'PUT',
                'url': /\/users/,
                'token': {
                    'location': 'body',
                    'string': 'my%20postings'
                },
                'getResponse': function(){return expectedResult;}
            }]

        };

        request.method = 'put';
        request.url = '/users?access_token=test_token_456';
        request.headers = {
            'blah': 123,
            'authentication': 'blah blah'
        };
        request.body = 'message=my%20post&time=today';

        result = fakeAResponse('api.facebook.com', request);
        expect(result).toBe(false);

    });

});