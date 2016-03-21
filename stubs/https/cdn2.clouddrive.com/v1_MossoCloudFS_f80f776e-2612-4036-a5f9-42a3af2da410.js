module.exports = function() {
    this.method = 'HEAD';
    this.url = '/v1/MossoCloudFS_f80f776e-2612-4036-a5f9-42a3af2da410/cntKomfoApps';

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
