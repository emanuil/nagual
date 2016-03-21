var generator = require('../../../helpers/generator.js');

module.exports = function() {
    this.method = 'POST';
    this.url = '/1.1/statuses/update_with_media.json';

    this.token = {
        string: 'test_token',
        location: 'headers'
    };

    this.getResponse = function(request) {

        var boundary = request.headers['content-type'].split('boundary=')[1];

        var firstIndex = request.body.indexOf(new Buffer(boundary));
        var secondIndex = request.body.indexOf(new Buffer(boundary), firstIndex + 1);

        var message = request.body.toString('utf8', firstIndex, secondIndex).split('\n')[3].trim();

        var authorization = request.headers.authorization;
        var idStr = authorization.substring(
            authorization.indexOf('test_token_') + 11,
            authorization.indexOf('test_token_') + 23
        );

        var tweetId = generator.getInteger(100000, 999999);
        var pictureId = generator.getInteger(100000, 999999);

        var result = {

            'created_at': generator.getCurrentDate(),
            'entities': {
                'hashtags': [],
                'media': [
                    {
                        'display_url': 'pic.twitter.com/lX5LVZO',
                        'expanded_url': 'http://twitter.com/fakekurrik/status/244204973972410368/photo/1',
                        'id': pictureId,
                        'id_str': pictureId.toString(),
                        'indices': [
                            44,
                            63
                        ],
                        'media_url': 'http://pbs.twimg.com/media/A2OXIUcCUAAXj9k.png',
                        'media_url_https': 'https://pbs.twimg.com/media/A2OXIUcCUAAXj9k.png',
                        'sizes': {
                            'large': {
                                'h': 175,
                                'resize': 'fit',
                                'w': 333
                            },
                            'medium': {
                                'h': 175,
                                'resize': 'fit',
                                'w': 333
                            },
                            'small': {
                                'h': 175,
                                'resize': 'fit',
                                'w': 333
                            },
                            'thumb': {
                                'h': 150,
                                'resize': 'crop',
                                'w': 150
                            }
                        },
                        'type': 'photo',
                        'url': 'http://t.co/lX5LVZO'
                    }
                ],
                'urls': [],
                'user_mentions': []
            },
            'id': tweetId,
            'id_str': tweetId.toString(),
            'text': message,
            'user': {
                'id': parseInt(idStr, 10),
                'id_str': idStr
            }
        };


        return {
            'body': JSON.stringify(result)
        };
    };
};
