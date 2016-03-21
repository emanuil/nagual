var url = require('url');
var parseBody = require('../../../helpers/parseBody.js');

module.exports = function(storage) {
    this.method = 'POST';
    this.url = '/:id';

    this.token = {
        string: 'test_token',
        location: 'body'
    };

    this.getResponse = function(request) {

        var existingPost, postId, inputs, result = {'data': {}};

        if(request.headers['content-type'].indexOf('boundary') > -1) {
            inputs = parseBody(request);

            postId = JSON.parse(inputs.batch)[0].relative_url.substring(1);

            existingPost = storage.get(postId.replace('photos_', ''));

            result = [{
                'body': JSON.stringify(existingPost)

            }, {
                'body': JSON.stringify({})
            }];

        } else {
            postId = url.parse(request.url, true).pathname.split('/')[1];

            existingPost = storage.get(postId);

            if(existingPost) {
                result = existingPost;
            }
        }



        return {
            'body': JSON.stringify(result)
        };
    };
};
