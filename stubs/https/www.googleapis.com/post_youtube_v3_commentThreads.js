var generator = require('../../../helpers/generator.js');

module.exports = function() {
    this.method = 'post';
    this.url = '/youtube/v3/commentThreads';

    this.token = {
        string: 'test_token',
        location: 'headers'
    };

    this.getResponse = function(request) {

        var body = JSON.parse(request.body);

        var result = {
            
            'snippet': {
                'videoId': body.snippet.videoId.value,
                'topLevelComment': {
                    'snippet': {
                        'updatedAt': generator.getCurrentDate(),
                        'authorProfileImageUrl': generator.getImageUrl(),
                        'authorDisplayName': generator.getUsername(),
                        'authorChannelUrl': generator.getUrl(),
                        // return the same text
                        'textDisplay': body.snippet.topLevelComment.snippet.textOriginal
                    }
                }
            },
            'id': generator.getInteger(1000000, 9999999)
        };

        return {
            'body': JSON.stringify(result)
        };
    };
};
