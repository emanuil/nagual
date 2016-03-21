var generator = require('../../../helpers/generator.js');

module.exports = function(storage) {
    this.method = 'POST';
    this.url = '/v2.5/:id/adsets';

    this.token = {
        string: 'test_token',
        location: 'body'
    };

    this.getResponse = function() {

        var id = generator.getInteger(2000000, 2999999);

        var result = {
            'id': id,
            'data': {
                'campaigns': {
                }
            }
        };

        result.data.campaigns[id] = {'id': id};

        storage.set(result.id, result, 5);

        return {
            'body': JSON.stringify({id: result.id})
        };
    };
};
