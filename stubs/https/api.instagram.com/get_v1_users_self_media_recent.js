var generator = require('../../../helpers/generator.js');
var url = require('url');

module.exports = function() {
    this.method = 'GET';
    this.url = /\/v1\/users\/self\/media\/recent/i;

    this.token = {
        string: 'test_token',
        location: 'url'
    };

    this.getResponse = function(request) {

        // return the same user id as the one in the request
        var id = url.parse(request.url, true).query.access_token.split('.')[0];

        var result = {
            'data': [{
                'id': id,
                'username': generator.getUsername(),
                'full_name': generator.getName()
            }]
        };

        return {
            'body': JSON.stringify(result)
        };
    };
};
