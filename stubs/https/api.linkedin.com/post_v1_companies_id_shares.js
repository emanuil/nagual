var generator = require('../../../helpers/generator.js');
var url = require('url');

module.exports = function(storage) {
    this.method = 'POST';
    this.url = '/v1/companies/:id/shares';

    this.token = {
        string: 'test_token',
        location: 'url'
    };

    this.getResponse = function(request) {

        var comment = JSON.parse(request.body).comment;
        var companyId = url.parse(request.url, true).pathname.split('/')[3];
        var postId = generator.getInteger(10000000, 99999999);

        var result = {
            'id': postId,
            'postText': comment
        };

        // store the result for later usage
        storage.set(companyId + '_post', result, 5);

        return {
            'body': JSON.stringify(result)
        };
    };
};
