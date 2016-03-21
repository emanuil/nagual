var url = require('url');
var queryString = require('querystring');
var generator = require('../../../helpers/generator.js');

module.exports = function(storage) {
    this.method = 'POST';
    this.url = '/v1/media/:id/comments';

    this.token = {
        string: 'test_token',
        location: 'body'
    };

    this.getResponse = function(request) {

        // store the text of the comment to be used later on the GET request
        var id = url.parse(request.url, true).pathname.split('/')[3];
        var text = queryString.parse(request.body).text;

        var comment = {
            'created_time': generator.getCurrentTimestamp(),
            'text': text,
            'from': {
                'username': generator.getUsername(),
                'id': generator.getInteger(100000, 999999),
                'full_name': generator.getName()
            },
            'id': generator.getInteger(100000, 999999)
        };

        var result = {
            'meta': {
                'code': 200
            },
            'data': null
        };

        storage.set(id, comment, 5);

        return {
            'body': JSON.stringify(result)
        };
    };
};
