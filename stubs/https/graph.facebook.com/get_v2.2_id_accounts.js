module.exports = function() {
    this.method = 'GET';
    this.url = '/v2.2/:id/accounts';

    this.token = {
        string: 'fake_token',
        location: 'url'
    };

    this.getResponse = function(request) {

        var i;
        var result = {
            'data': []
        };

        var accessToken = request.url.split('access_token=')[1].split('_');
        var facebookPages = accessToken.splice(3, accessToken.length);

        for(i = 0; i < facebookPages.length; i++) {
            result.data.push({'id': facebookPages[i], 'perms': ['CREATE_CONTENT']});
        }

        return {
            'body': JSON.stringify(result)
        };
    };
};
