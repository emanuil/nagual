var generator = require('../../../helpers/generator.js');
var parseBody = require('../../../helpers/parseBody.js');

module.exports = function(storage) {
    this.method = 'POST';
    this.url = '/v2.2/:id/comments';

    this.token = {
        string: 'test_token',
        location: 'body'
    };

    this.getResponse = function(request) {

        //var message = request.body.split('&')[0].split('=')[1];

        var inputs = parseBody(request);

        var result = {
            'id': generator.getInteger(100000, 999999),
            'message': inputs.message
        };

        storage.set(result.id, result, 5);

        return {
            'body': JSON.stringify(result)
        };
    };
};
