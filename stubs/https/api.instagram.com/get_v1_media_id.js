var url = require('url');

module.exports = function() {
    this.method = 'GET';
    this.url = '/v1/media/:id';

    this.token = {
        string: 'test_token',
        location: 'url'
    };

    this.getResponse = function(request) {

        // return the same media_id
        var id = url.parse(request.url, true).pathname.split('/')[3];

        var result = {
            'data': {
                'id': id
            }
        };

        return {
            'body': JSON.stringify(result)
        };
    };
};
