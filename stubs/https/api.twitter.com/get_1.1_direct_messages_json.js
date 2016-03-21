module.exports = function(storage) {
    this.method = 'GET';
    this.url = '/1.1/direct_messages.json';

    this.token = {
        string: 'test_token',
        location: 'headers'
    };

    this.getResponse = function(request) {

        var result;
        var authorization = request.headers.authorization;
        var idStr = authorization.substring(
            authorization.indexOf('test_token_') + 11,
            authorization.indexOf('test_token_') + 23
        );

        var storedResult = storage.get(idStr);

        if(storedResult) {
            result = [storedResult];
        } else {
            result = [];
        }

        return {
            'body': JSON.stringify(result)
        };
    };
};
