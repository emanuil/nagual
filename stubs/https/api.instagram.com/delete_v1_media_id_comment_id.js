module.exports = function() {
    this.method = 'DELETE';
    this.url = '/v1/media/:id/comments/:id';

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
