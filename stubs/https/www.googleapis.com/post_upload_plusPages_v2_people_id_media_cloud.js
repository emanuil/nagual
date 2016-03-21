var generator = require('../../../helpers/generator.js');

module.exports = function() {
    this.method = 'post';
    this.url = '/upload/plusPages/v2/people/:id/media/cloud';

    this.token = {
        string: 'test_token',
        location: 'headers'
    };

    this.getResponse = function() {

        var result = {
            'verb': 'post',
            'id': generator.getInteger(1000000, 9999999),
            'published': generator.getCurrentDate()
        };

        return {
            'body': JSON.stringify(result)
        };
    };
};
