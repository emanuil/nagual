module.exports = function() {
    this.method = 'HEAD';
    this.url = /.*/;

    this.token = {
        string: 'd74f592f986e4d6e995853ccf0123456',
        location: 'headers'
    };

    this.getResponse = function() {

        return {
            'body': JSON.stringify('{"id":1}')
        };
    };
};
