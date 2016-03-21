var generator = require('../../../helpers/generator.js');

module.exports = function() {
    this.method = 'POST';
    this.url = '/v2.2/:id/albums';

    this.token = {
        string: 'test_token',
        location: 'body'
    };

    this.getResponse = function() {

        var result = {
            'id': generator.getInteger(1000000, 1999999)
        };

        return {
            'body': JSON.stringify({id: result.id})
        };
    };
};
