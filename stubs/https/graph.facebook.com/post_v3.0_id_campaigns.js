var generator = require('../../../helpers/generator.js');
var parseBody = require('../../../helpers/parseBody.js');

module.exports = function(storage) {
    this.method = 'POST';
    this.url = '/v3.0/:id/campaigns';

    
    this.token = {
        string: 'test_token',
        location: 'body'
    };

    this.getResponse = function(request) {

        var inputs = parseBody(request);

        var result = {
            'id': generator.getInteger(1000000, 1999999),
            'name': inputs.name,
            'objective': inputs.objective,
            'effective_status': inputs.status
        };

        storage.set(result.id, result, 5);

        return {
            'body': JSON.stringify({id: result.id})
        };
    };
};
