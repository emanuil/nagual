module.exports = function() {
    this.method = 'GET';
    this.url = '/api/v2/users.json';

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
