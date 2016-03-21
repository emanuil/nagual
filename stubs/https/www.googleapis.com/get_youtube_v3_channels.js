module.exports = function() {
    this.method = 'GET';
    this.url = '/youtube/v3/channels';

    this.token = {
        string: 'test_token',
        location: 'headers'
    };

    this.getResponse = function(request) {

        var result = {

            'items': [
                {
                    'snippet': {
                        // return the same channel name
                        'title': request.headers.authorization.split(' ')[1].split('.')[0]
                    }
                }
            ]
        };

        return {
            'body': JSON.stringify(result)
        };
    };
};
