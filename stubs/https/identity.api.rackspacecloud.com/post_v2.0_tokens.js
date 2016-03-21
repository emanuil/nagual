module.exports = function() {
    this.method = 'POST';
    this.url = '/v2.0/tokens';

    this.token = {
        string: 'auto_komfo',
        location: 'body'
    };

    this.getResponse = function() {

        var result = {
            'access': {
                'token': {
                    'id': 'd74f592f986e4d6e995853ccf0123456',
                    'expires': '2017-06-05T16:24:57.637Z',
                    'tenant': {
                        'id': '123456',
                        'name': '123456'
                    },
                    'RAX-AUTH:authenticatedBy': [
                        'APIKEY'
                    ]
                },
                'serviceCatalog': [
                    {
                        'name': 'cloudFilesCDN',
                        'endpoints': [
                            {
                                'region': 'ORD',
                                'tenantId': 'MossoCloudFS_f80f776e-2612-4036-a5f9-42a3af2da410',
                                'publicURL': 'https://cdn2.clouddrive.com/v1' +
                                '/MossoCloudFS_f80f776e-2612-4036-a5f9-42a3af2da410'
                            }
                        ],
                        'type': 'rax:object-cdn'
                    },
                    {
                        'name': 'cloudFiles',
                        'endpoints': [
                            {
                                'region': 'ORD',
                                'tenantId': 'MossoCloudFS_f80f776e-2612-4036-a5f9-42a3af2da410',
                                'publicURL': 'https://storage101.ord1.clouddrive.com/v1' +
                                '/MossoCloudFS_f80f776e-2612-4036-a5f9-42a3af2da410',
                                'internalURL': 'https://snet-storage101.ord1.clouddrive.com/v1' +
                                '/MossoCloudFS_f80f776e-2612-4036-a5f9-42a3af2da410'
                            }
                        ],
                        'type': 'object-store'
                    }
                ],
                'user': {
                    'id': '172157',
                    'roles': [
                        {
                            'id': '10000150',
                            'description': 'Checkmate Access role',
                            'name': 'checkmate'
                        },
                        {
                            'tenantId': 'MossoCloudFS_f80f776e-2612-4036-a5f9-42a3af2da410',
                            'id': '5',
                            'description': 'A Role that allows a user access to keystone Service methods',
                            'name': 'object-store:default'
                        },
                        {
                            'tenantId': '123456',
                            'id': '6',
                            'description': 'A Role that allows a user access to keystone Service methods',
                            'name': 'compute:default'
                        },
                        {
                            'id': '3',
                            'description': 'User Admin Role.',
                            'name': 'identity:user-admin'
                        }
                    ],
                    'name': 'yourUserName',
                    'RAX-AUTH:defaultRegion': 'DFW'
                }
            }
        };

        return {
            'body': JSON.stringify(result)
        };
    };
};
