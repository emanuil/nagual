var generator = require('../../../helpers/generator.js');

module.exports = function(storage) {
    this.method = 'GET';
    this.url = '/api/v2/search.json';

    this.token = {
        string: 'test_token',
        location: 'headers'
    };


    this.getResponse = function() {


        var objects = storage.keys();
        var result = {'results': []};


        // this is the zendesk gathering, so we need to return
        // all the locally stored objects
        objects.forEach(function(object) {
            var currentResult = {
                id: object,
                status: 'solved',
                updated_at: generator.getCurrentDate()
            };
            result.results.push(currentResult);
        });

        return {
            'body': JSON.stringify(result)
        };
    };
};
