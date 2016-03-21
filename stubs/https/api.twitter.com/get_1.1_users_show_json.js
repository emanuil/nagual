module.exports = function() {
    this.method = 'GET';
    this.url = '/1.1/users/show.json';

    this.token = {
        string: 'test_token',
        location: 'headers'
    };

    this.getResponse = function() {

        var result = {
            'name':'automatically created user'
        };

        return {
            'body': JSON.stringify(result)
        };
    };
};
