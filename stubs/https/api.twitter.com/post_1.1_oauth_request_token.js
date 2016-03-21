module.exports = function() {
    this.method = 'POST';
    this.url = '/oauth/request_token';

    this.token = {
        string: 'some_fake_key',
        location: 'headers'
    };

    this.getResponse = function() {

        return {
            'body':
                    'oauth_token=oauth_test_token' +
                    '&oauth_token_secret=oauth_test_token_secret' +
                    '&oauth_callback_confirmed=true'
        };
    };
};
