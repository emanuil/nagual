module.exports = function() {
    this.method = 'GET';
    this.url = '/1.1/statuses/home_timeline.json';

    this.token = {
        string: 'test_token',
        location: 'headers'
    };

    this.getResponse = function() {

        return {
            'body': JSON.stringify('{"id":1}')
        };
    };
};
