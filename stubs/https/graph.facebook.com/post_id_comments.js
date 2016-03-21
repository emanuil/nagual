var generator = require('../../../helpers/generator.js');

module.exports = function(storage) {
    this.method = 'POST';
    this.url = '/:id/comments';

    this.token = {
        string: 'test_token',
        location: 'body'
    };

    this.getResponse = function(request) {

        var message = request.body.split('&')[0].split('=')[1];

        var result = {
            'id': generator.getInteger(100000, 999999),
            'message': message
        };

        storage.set(result.id, result, 5);

        return {
            'body': JSON.stringify(result)
        };
    };
};
