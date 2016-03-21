var url = require('url');

module.exports = function(storage) {
    this.method = 'GET';
    this.url = '/v2.4/:id/feed';

    this.token = {
        string: 'test_token',
        location: 'url'
    };

    this.getResponse = function(request) {

        var wallFeed;
        var result = {
            'data': []
        };

        var wallId = url.parse(request.url, true).pathname.split('/')[2];

        wallFeed = storage.get(wallId);

        if(wallFeed) {
            result = wallFeed;
        }

        return {
            'body': JSON.stringify(result)
        };
    };
};
