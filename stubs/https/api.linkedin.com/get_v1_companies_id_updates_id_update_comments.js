var url = require('url');

module.exports = function(storage) {
    this.method = 'GET';
    this.url = '/v1/companies/:id/updates/:id/update-comments';

    this.token = {
        string: 'test_token',
        location: 'url'
    };

    this.getResponse = function(request) {

        var companyId = url.parse(request.url, true).pathname.split('/')[3];

        var storedComment = storage.get(companyId + '_comment');

        var result = {
            '_total': 1,
            'values': [
                {
                    'comment': storedComment.commentText,
                    'id': storedComment.id,
                    'person': {
                        'apiStandardProfileRequest': {
                            'headers': {
                                '_total': 1,
                                'values': [
                                    {
                                        'name': 'x-li-auth-token',
                                        'value': 'name:Ff1A'
                                    }
                                ]
                            },
                            'url': 'https://api.linkedin.com/v1/people/12345678'
                        },
                        'firstName': 'Samwise',
                        'headline': 'Journeyman',
                        'id': '23456789',
                        'lastName': 'Gamgee',
                        'pictureUrl': 'https://media.licdn.com/mpr/mprx/…',
                        'siteStandardProfileRequest': {
                            'url': 'https://www.linkedin.com/profile/view?id=…'
                        }
                    },
                    'sequenceNumber': 0,
                    'timestamp': storedComment.timestamp
                }
            ]
        };

        return {
            'body': JSON.stringify(result)
        };
    };
};
