var url = require('url');

module.exports = function() {
    this.method = 'GET';
    this.url = '/v2.5/:id/snippets';

    this.token = {
        string: 'test_token',
        location: 'url'
    };

    this.getResponse = function(request) {

        var result;
        var id = url.parse(request.url, true).pathname.split('/')[2];

        result = {
            data: {}
        };

        result.data[id] = {
            'js': 'some fake code here'
        };

        return {
            'body': JSON.stringify(result)
        };
    };
};
