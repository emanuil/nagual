var generator = require('../../../helpers/generator.js');
var queryString = require('querystring');

module.exports = function(storage) {
    this.method = 'POST';
    this.url = '/:id/feed';

    this.token = {
        string: 'test_token',
        location: 'body'
    };

    this.getResponse = function(request) {

        var permission, result;
        var wallId = request.url.split('/')[1];
        var message = request.body.split('&')[0].split('=')[1];
        var published = queryString.parse(request.body).published;
        var targeting = queryString.parse(request.body).targeting;
        var postId = generator.getInteger(100000, 999999);


        if (targeting === '{"countries":"BG"}') {
            permission = {
                'value': 'CUSTOM',
                'description': 'Bulgaria',
                'friends': '',
                'allow': '',
                'deny': ''
            };
        } else {
            permission = {
                'value': 'EVERYONE',
                'description': 'Public',
                'friends': '',
                'allow': '',
                'deny': ''
            };
        }

        result = {
            'id': generator.getInteger(100000, 999999),
            'post_id': wallId + '_' + postId,
            'wall_id': wallId,
            'message': message,
            'is_published': published === 'true' ? 1 : 0,
            'permission': permission
        };

        storage.set(result.post_id, result, 5);

        return {
            'body': JSON.stringify(result)
        };
    };
};
