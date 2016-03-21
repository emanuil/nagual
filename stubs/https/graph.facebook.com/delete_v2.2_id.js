module.exports = function() {
    this.method = 'DELETE';
    this.url = '/v2.2/:id';

    this.token = {
        string: 'test_token',
        location: 'body'
    };

    this.getResponse = function() {

        return {
            'body': JSON.stringify({'success': true})
        };
    };
};
