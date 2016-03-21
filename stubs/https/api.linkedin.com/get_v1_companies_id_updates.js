var generator = require('../../../helpers/generator.js');
var url = require('url');

module.exports = function(storage) {
    this.method = 'GET';
    this.url = '/v1/companies/:id/updates';

    this.token = {
        string: 'test_token',
        location: 'url'
    };

    this.getResponse = function(request) {

        var companyId = url.parse(request.url, true).pathname.split('/')[3];
        var storedPost = storage.get(companyId + '_post');
        var storedComment = storage.get(companyId + '_comment');
        var result;
        var postId;
        var post;

        if(storedPost) {
            // Return information about the post we just posted
            postId = storedPost.id;

            post = {
                'updateContent': {
                    'company': {
                        'id': companyId,
                        'name': 'Slanchaka_' + companyId
                    },
                    'companyStatusUpdate': {
                        'share': {
                            'id': postId,
                            'comment': storedPost.postText,
                            'timestamp': generator.getCurrentTimestamp(),
                            'content': {
                                'title': 'automatically gathered LIP post',
                                'description:': 'auto description'
                            }
                        }
                    }
                },
                'updateKey': 'UPDATE-c' + companyId + '-' + postId
            };

            if(storedComment) {
                post.updateComments = {
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
            }
        } else {
            //This is the regular gathering, just return random post
            postId = generator.getInteger(10000000, 99999999);

            post = {

                'updateContent': {
                    'company': {
                        'id': companyId,
                        'name': 'Slanchaka_' + companyId
                    },
                    'companyStatusUpdate': {
                        'share': {
                            'id': postId,
                            'comment': 'auto message ' + generator.getString(10),
                            'timestamp': generator.getCurrentTimestamp(),
                            'content': {
                                'title': 'automatically gathered NEW LIP post from gathering',
                                'description:': 'auto description'
                            }
                        }
                    }
                },

                'updateKey': 'UPDATE-c' + companyId + '-' + postId
            };

        }


        if(request.url.indexOf('event-type=status-update') > -1) {
            result = {
                'values': [
                    post
                ]
            };

        } else {
            result = post;
        }


        return {
            'body': JSON.stringify(result)
        };
    };
};
