module.exports = function() {
    this.method = 'GET';
    this.url = '/v2.2/:id/conversations';

    this.token = {
        string: 'test_token',
        location: 'url'
    };

    this.getResponse = function() {

        var result = {
            'data': []
        };


        return {
            'body': JSON.stringify(result)
        };
    };
};
