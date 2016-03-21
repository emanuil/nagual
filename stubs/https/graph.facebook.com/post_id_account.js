var queryString = require('querystring');

module.exports = function() {
    this.method = 'POST';
    this.url = '/:id/accounts';

    this.token = {
        string: 'fake_token',
        location: 'body'
    };

    this.getResponse = function(request) {

        var i;
        var result = {
            'data': []
        };

        var accessToken = queryString.parse(request.body).access_token.split('_');

        var facebookPages = accessToken.splice(3, accessToken.length);


        for(i = 0; i < facebookPages.length; i++) {
            result.data.push({'id': facebookPages[i]});
        }

        return {
            'body': JSON.stringify(result)
        };
    };
};
