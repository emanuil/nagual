var generator = require('../../../helpers/generator.js');
var queryString = require('querystring');
var parseBody = require('../../../helpers/parseBody.js');

module.exports = function(storage) {
    this.method = 'POST';
    this.url = '/v2.3/:id/feed';

    this.token = {
        string: 'test_token',
        location: 'body'
    };

    this.getResponse = function(request) {

        var permission, result, feedEntry, wallFeed, inputs;
        var message, published, targeting, postId;
        var wallId = request.url.split('/')[2];

        // multipart body
        if(request.headers['content-type'].indexOf('boundary') > -1) {
            inputs = parseBody(request);

            message = inputs.message;
            published = inputs.published;
            targeting = inputs.targeting;

        } else {
            // regular body
            message = request.body.split('&')[0].split('=')[1];
            published = queryString.parse(request.body).published;
            targeting = queryString.parse(request.body).targeting;
        }


        postId = generator.getInteger(100000, 999999);


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
            'is_published': published === 'true',
            'permission': permission,
            'type': 'status',
            'timeline_visibility': 'normal',
            'comments': {
                data: [],
                summary: {
                    order: 'chronological',
                    total_count: 0,
                    can_comment: true
                }
            },
            'from': {
                'name': 'Teodor Nikolov',
                'id': '100004881631958'
            },
            'to': {
                'data': [
                    {
                        'id': wallId,
                        'name': 'fake facebook page'
                    }
                ]
            },
            'status_type': 'wall_post',
            'created_time': generator.getFacebookDate(),
            'updated_time': generator.getFacebookDate(),
            'is_hidden': false,
            'likes': {
                'data': [],
                'summary': {
                    'total_count': 0,
                    'can_like': true,
                    'has_liked': false
                }
            },
            'metadata': {
                'type': 'post'
            }
        };

        storage.set(result.post_id, result, 5);

        feedEntry = {'created_time': generator.getCurrentDate(), 'id': result.post_id};
        wallFeed = storage.get(wallId);

        if(wallFeed) {
            wallFeed.data.push(feedEntry);
            storage.set(wallId, wallFeed, 5);
        } else {
            storage.set(wallId, {'data': [feedEntry]}, 5);
        }

        return {
            'body': JSON.stringify(result)
        };
    };
};
