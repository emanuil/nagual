module.exports = function() {
    this.method = 'GET';
    this.url = '/1.1/users/lookup.json';

    this.token = {
        string: 'test_token',
        location: 'headers'
    };

    this.getResponse = function() {

        var result = {
            'screen_name':'',
            'profile_image_url':'',
            'profile_image_url_https':''
        };

        return {
            'body': JSON.stringify(result)
        };
    };
};
