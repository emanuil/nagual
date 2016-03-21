var generator = require('../../../helpers/generator.js');

module.exports = function(storage) {
    this.method = 'GET';
    this.url = '/1.1/statuses/user_timeline.json';

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
        var followersCount, name, screenName, senderName, tweetId, senderId, directMessageId;

        var result = storage.get(idStr);

        if(!result) {

            followersCount = generator.getInteger(1, 10);
            name = 'automation test user name';
            screenName = generator.getString(7);
            senderName = generator.getString(7);
            tweetId = generator.getInteger(100000, 999999);
            senderId = generator.getInteger(100000, 999999);
            directMessageId = generator.getInteger(100000, 999999);

            result = [
                // regular tweet
                {
                    'user': {
                        'followers_count': followersCount,
                        'name': name,
                        'id_str': generator.getInteger(100000, 999999),
                        'screen_name': screenName
                    },
                    'created_at': generator.getCurrentDate(),
                    'retweet_count': generator.getInteger(0, 5),
                    'text': 'random tweet ' + idStr,
                    'id_str': tweetId
                },

                // reply
                {
                    'user': {
                        'followers_count': generator.getInteger(1, 10),
                        'name': 'automation test user name',
                        'id_str': generator.getInteger(100000, 999999),
                        'screen_name': generator.getString(7)
                    },
                    'created_at': generator.getCurrentDate(),
                    'retweet_count': generator.getInteger(0, 5),
                    'text': 'random reply ' + idStr,
                    'id_str': generator.getInteger(100000, 999999),
                    'in_reply_to_status_id_str': tweetId
                },

                // direct message
                {
                    'created_at': generator.getCurrentDate(),
                    'text': 'dm ' + idStr,

                    'id': directMessageId,
                    'id_str': directMessageId.toString(),

                    'recipient': {
                        'id': parseInt(idStr,10),
                        'id_str': idStr
                    },

                    'recipient_id': idStr,
                    'recipient_screen_name': screenName,

                    'sender': {
                        'id': senderId,
                        'id_str': senderId.toString(),

                        'screen_name': senderName
                    },

                    'sender_id': senderId,
                    'sender_screen_name': senderName
                }

            ];

            storage.set(idStr, result, 5);

        }

        return {
            'body': JSON.stringify(result)
        };




    };
};
