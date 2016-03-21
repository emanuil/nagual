var parseBody = require('../../../helpers/parseBody.js');

describe('parseBodyTest', function() {

    it('Parse multipart body with no binary data', function() {

        var result, request = {};

        var url = 'http://c9555.r55.cf2.rackcdn.com' +
            '/testing/FROM_FTP/api_user_data/module_scheduler/42edf510d0a99a9f.jpg';
        var message = 'hey you';
        var access_token = 'test_token_WLPAKSJBOHPHOCAW';
        var method = 'POST';

        request.headers = {
            'content-type': 'multipart/form-data; boundary=----------------------------9551439fb952'
        };

        request.body = '------------------------------9551439fb952' +
            'Content-Disposition: form-data; name="url"' +
            '\r\n' +
            'http://c9555.r55.cf2.rackcdn.com/testing/FROM_FTP/api_user_data/module_scheduler/42edf510d0a99a9f.jpg' +
            '------------------------------9551439fb952' +
            'Content-Disposition: form-data; name="message"' +
            '\r\n' +
            message +
            '------------------------------9551439fb952' +
            'Content-Disposition: form-data; name="access_token"' +
            '\r\n' +
            access_token +
            '------------------------------9551439fb952' +
            'Content-Disposition: form-data; name="method"' +
            '\r\n' +
            method +
            '------------------------------9551439fb952--';

        result = parseBody(request);

        expect(Object.keys(result).length).toEqual(4);
        expect(result.url).toEqual(url);
        expect(result.message).toEqual(message);
        expect(result.access_token).toEqual(access_token);
        expect(result.method).toEqual(method);

    });

});