var generator = require('../../../helpers/generator.js');
var url = require('url');

module.exports = function(storage) {
    this.method = 'POST';
    this.url = '/v1/companies/:id/updates/:id/update-comments-as-company';

    this.token = {
        string: 'test_token',
        location: 'url'
    };

    this.getResponse = function(request) {

        var comment = JSON.parse(request.body).comment;

        var result = {
            'id': generator.getInteger(10000000, 99999999),
            'timestamp': generator.getCurrentTimestamp(),
            'commentText': comment
        };

        var companyId = url.parse(request.url, true).pathname.split('/')[3];

        // store the result for later usage
        storage.set(companyId + '_comment', result, 5);

        return {
            'body': JSON.stringify(result)
        };
    };
};
