var url = require('url');

module.exports = function(storage) {
    this.method = 'GET';
    this.url = '/v2.2/:id';

    this.token = {
        string: 'test_token',
        location: 'url'
    };

    this.getResponse = function(request) {

        var result;
        var id = url.parse(request.url, true).pathname.split('/')[2];

        if(id.indexOf('act_') > -1) {
            result = [];
        } else {
            result = storage.get(id);
        }

        return {
            'body': JSON.stringify(result)
        };
    };
};
