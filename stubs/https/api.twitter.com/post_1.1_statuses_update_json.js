var generator = require('../../../helpers/generator.js');

module.exports = function() {
    this.method = 'POST';
    this.url = '/1.1/statuses/update.json';

    this.token = {
        string: 'test_token',
        location: 'headers'
    };

    this.getResponse = function(request) {

        var formattedTimestamp, id, result;
        var authorization = request.headers.authorization;
        var testTokenIndex = authorization.indexOf('test_token_');
        var userId = authorization.substring(testTokenIndex + 11, testTokenIndex + 23);

        var currentTimestamp = new Date().toISOString();
        var milliseconds = new Date().getMilliseconds();


        // Due to Mongo bug, if the milliseconds start with 0, e.g.
        // 012891, it will be recorded as if the milliseconds are .000000
        // we need to make sure that when we have such case, we replace 0 with 1

        if(currentTimestamp.indexOf('.0') > - 1) {
            currentTimestamp = currentTimestamp.replace(/\../, '.1');
        }

        formattedTimestamp = currentTimestamp.replace('T', ' ');
        formattedTimestamp = formattedTimestamp.replace('Z', milliseconds.toString());

        id = generator.getInteger(100000, 999999);

        result = {
            'id': id,
            'id_str': id.toString(),
            'from_user_id_str': userId,
            'user': {
                'name': 'name_' + generator.getString(7),
                'screen_name': 'screen_name_' + generator.getString(5)
            },
            'created_at': formattedTimestamp
        };

        return {
            'body': JSON.stringify(result)
        };
    };
};
