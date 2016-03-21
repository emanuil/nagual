var generator = require('../../../helpers/generator.js');
var url = require('url');

module.exports = function(storage) {
    this.method = 'POST';
    this.url = '/:id/photos';

    this.token = {
        string: 'test_token',
        location: 'body'
    };

    this.getResponse = function(request) {

        var wallId = url.parse(request.url, true).pathname.split('/')[1];
        var photoId = generator.getInteger(1000000, 1999999);

        var result = {
            'id': photoId,
            'post_id': wallId + '_' + photoId
        };

        storage.set(result.id, result, 5);
        return {
            'body': JSON.stringify(result)
        };
    };
};
