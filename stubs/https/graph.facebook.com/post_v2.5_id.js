module.exports = function() {
    this.method = 'POST';
    this.url = '/v2.5/:id';

    this.token = {
        string: 'test_token',
        location: 'body'
    };

    this.getResponse = function() {

        return {
            'body': JSON.stringify({})
        };
    };
};
