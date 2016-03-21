var queryString = require('querystring');
var parseBody = require('../../../helpers/parseBody.js');

module.exports = function(storage) {
    this.method = 'POST';
    this.url = '/v2.2';

    this.token = {
        string: 'fake_token',
        location: 'body'
    };

    this.getResponse = function(request) {

        var postId, existingPost, inputs, result;

        // multipart body
        if(request.headers['content-type'].indexOf('boundary') > -1) {
            inputs = parseBody(request);

            postId = JSON.parse(inputs.batch)[0].relative_url.substring(1);

            existingPost = storage.get(postId.replace('photos_', ''));
        } else {
            // regular body
            postId = JSON.parse(queryString.parse(request.body).batch)[0].relative_url.substring(1);
            existingPost = storage.get(postId);
        }

        result = [{
            'body': JSON.stringify(existingPost)

        }, {
            'body': JSON.stringify({})
        }];

        return {
            'body': JSON.stringify(result)
        };
    };
};
