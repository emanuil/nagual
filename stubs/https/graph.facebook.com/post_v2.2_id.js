module.exports = function() {
    this.method = 'POST';
    this.url = '/v2.2/:id';

    this.token = {
        string: 'test_token',
        location: 'body'
    };

    this.getResponse = function() {

        return {
            'body': JSON.stringify({'data': {}})
        };
    };
};
