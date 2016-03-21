var fs = require('fs');
var path = require('path');
var body = fs.readFileSync(path.join(__dirname, '/5e498bb75183a181.jpg'));

module.exports = function() {
    this.method = 'GET';
    this.url = /.*/;

    this.token = {
        string: '5e498bb75183a181',
        location: 'url'
    };

    this.getResponse = function() {

        return {
            'headers': {'Content-Type': 'image/jpeg'},
            'body': body
        };
    };
};
