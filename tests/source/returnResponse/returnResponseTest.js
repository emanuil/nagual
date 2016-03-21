var returnResponse = require('../../../source/returnResponse.js').returnResponse;
var responseObject = require('../../../source/returnResponse.js');

process.env.NODE_ENV = 'test';

describe('returnResponseTest', function() {

    it('The response should be faked', function() {

        var result, request, response, callback, expectedResult = 'yes', fakedResponse = 'faked';

        response = 'empty';

        request = {
            'headers': {
                'host': 'api.twitter.com'
            }
        };

        callback = jasmine.createSpy('callback').and.returnValue(expectedResult);

        spyOn(responseObject, 'fakeAResponse').and.returnValue(fakedResponse);


        result = returnResponse(request, response, callback);

        expect(result).toBe(expectedResult);
        expect(callback).toHaveBeenCalledWith(response, fakedResponse);
    });


    it('The response should not be faked', function() {

        var request, response, callback, expectedResult = 'yes';

        response = 'empty';

        request = {
            'headers': {
                'host': 'api.twitter.com'
            }
        };

        callback = jasmine.createSpy('callback').and.returnValue(expectedResult);

        spyOn(responseObject, 'fakeAResponse').and.returnValue(false);
        spyOn(responseObject, 'contactTheRealServer');

        returnResponse(request, response, callback);

        expect(responseObject.contactTheRealServer).toHaveBeenCalled();
    });
});