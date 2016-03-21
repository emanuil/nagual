module.exports = function() {
    this.method = 'HEAD';
    this.url = /.*/;

    this.token = {
        string: '5e498bb75183a181',
        location: 'url'
    };

    this.getResponse = function() {

        return {
            'body': JSON.stringify('{"id":3}')
        };
    };
};
