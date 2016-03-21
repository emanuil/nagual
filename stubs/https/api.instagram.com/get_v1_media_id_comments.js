var generator = require('../../../helpers/generator.js');
var url = require('url');

module.exports = function(storage) {
    this.method = 'GET';
    this.url = '/v1/media/:id/comments';

    this.token = {
        string: 'test_token',
        location: 'url'
    };

    this.getResponse = function(request) {

        // return the same id as the one in the request
        var id = url.parse(request.url, true).pathname.split('/')[3];

        // get the same text as posted
        var text = storage.get(id);

        var result = {
            'data': [
                {
                    'created_time': generator.getCurrentTimestamp(),
                    'text': text,
                    'id': generator.getInteger(100000, 999999),
                    'from': {
                        'username': generator.getUsername(),
                        'id': generator.getInteger(100000, 999999),
                        'full_name': generator.getName()
                    }
                }
            ]
        };

        return {
            'body': JSON.stringify(result)
        };
    };
};
