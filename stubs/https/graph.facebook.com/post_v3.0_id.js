var parseBody = require('../../../helpers/parseBody.js');
var url = require('url');

module.exports = function() {
    this.method = 'POST';
    this.url = '/v3.0/:id';

    this.token = {
        string: 'test_token',
        location: 'body'
    };

    this.getResponse = function(request) {

        var inputs = parseBody(request);
        var id = url.parse(request.url, true).pathname.split('/')[2];
        
        var result = {
        	'id': id,
            'name': inputs.name,
            'objective': inputs.objective,
        };

        return {
            'body': JSON.stringify({id: result.id, name: result.name})
        };
    };
};
