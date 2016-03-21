var generator = require('../../../helpers/generator.js');
var parseBody = require('../../../helpers/parseBody.js');

module.exports = function(storage) {
    this.method = 'POST';
    this.url = '/v2.5/:id/offsitepixels';

    this.token = {
        string: 'test_token',
        location: 'body'
    };

    this.getResponse = function(request) {

        var inputs = parseBody(request);

        var result = {
            'id': generator.getInteger(1000000, 1999999),
            'name': inputs.name,
            'tag': inputs.tag,
            'js_pixel': '<!-- TEST Facebook Conversion Code for CheckOuts AD TEST -->',
            'status': 'Active',
            'creator': generator.getInteger(1000000000000000, 9999999999999999)
        };

        storage.set(result.id, result, 5);

        return {
            'body': JSON.stringify({id: result.id})
        };
    };
};
