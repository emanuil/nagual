module.exports = function() {
    this.method = 'GET';
    this.url = '/publish/ads/adcollaborators/me';

    this.token = {
        string: '/publish/ads/adcollaborators/me',
        location: 'url'
    };

    this.getResponse = function(request) {

        var result =
        {
          "adCollaboratorId": "8a817eb065f16f8c0165f1c6d8b00018",
          "adAccounts": [{
             "adAccountId": "999999999",
             "adAccountName": "test ad account",
             "connected": true,
             "currency": "DKK",
             "network": "facebook",
             "adCollaboratorRole": "advertiser"
          }],
        }; 
        
        return {
            'body': JSON.stringify(result)
        };
    };
};
