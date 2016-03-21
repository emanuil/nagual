module.exports = function() {
    this.method = 'GET';
    this.url = '/api/v2/tickets/:id/comments.json';

    this.token = {
        string: 'test_token',
        location: 'headers'
    };

    this.getResponse = function() {


        var result = {
            'comments': [
                [{'ticket_status':'open'}]
            ]
        };

        return {
            'body': JSON.stringify(result)
        };
    };
};
