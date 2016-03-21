var generator = require('../../../helpers/generator.js');

module.exports = function() {
    this.method = 'post';
    this.url = '/plusPages/v2/activities/:id/comments';

    this.token = {
        string: 'test_token',
        location: 'headers'
    };

    this.getResponse = function(request) {

        var content = JSON.parse(request.body).object.originalContent;

        var result = {
            'verb': 'comment',
            'id': generator.getInteger(1000000, 9999999),
            'published': generator.getCurrentDate(),
            'object': {
                'content': content
            }
        };

        return {
            'body': JSON.stringify(result)
        };
    };
};
