var generator = require('../../../helpers/generator.js');

module.exports = function(storage) {
    this.method = 'POST';
    this.url = '/1.1/direct_messages/new.json';

    this.token = {
        string: 'test_token',
        location: 'headers'
    };

    this.getResponse = function(request) {

        var authorization = request.headers.authorization;
        var idStr = authorization.substring(
            authorization.indexOf('test_token_') + 11,
            authorization.indexOf('test_token_') + 23
        );

        // we need to use the same dm ID as the twitter account id, so that we can match what
        // tailer is returning. this should be temporary until tailer is part of the docker installation
        var dmId = parseInt(idStr, 10);
        var recipientId = generator.getInteger(100000, 999999);


        var result = {
            'created_at': generator.getTwitterDate(),
            'id': dmId,
            'id_str': dmId.toString(),
            'recipient': {
                'id': recipientId,
                'id_str': recipientId.toString()
            },
            'recipient_id': recipientId,
            'recipient_screen_name': generator.getString(10),
            'sender': {
                'id': idStr,
                'id_str': idStr.toString()
            },
            'sender_id': idStr,
            'sender_screen_name': generator.getString(10),
            'text': 'DM text ' + idStr
        };

        storage.set(idStr, result, 5);

        return {
            'body': JSON.stringify(result)
        };
    };
};
