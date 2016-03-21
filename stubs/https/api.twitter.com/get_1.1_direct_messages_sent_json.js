module.exports = function() {
    this.method = 'GET';
    this.url = '/1.1/direct_messages/sent.json';

    this.token = {
        string: 'test_token',
        location: 'headers'
    };

    this.getResponse = function() {

        var result = [];

        return {
            'body': JSON.stringify(result)
        };
    };
};
