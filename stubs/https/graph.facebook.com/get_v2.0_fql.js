module.exports = function() {
    this.method = 'GET';
    this.url = '/v2.0/fql';

    this.token = {
        string: 'test_token',
        location: 'url'
    };

    this.getResponse = function() {

        return {
            'body': JSON.stringify({})
        };
    };
};
