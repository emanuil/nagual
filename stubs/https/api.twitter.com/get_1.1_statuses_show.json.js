module.exports = function() {
    this.method = 'GET';
    this.url = '/1.1/statuses/show.json';

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
