var generator = require('../../../helpers/generator.js');

module.exports = function(storage) {
    this.method = 'POST';
    this.url = '/api/v2/tickets.json';

    this.token = {
        string: 'test_token',
        location: 'headers'
    };

    this.getResponse = function() {

        var result = {
            'ticket': {
                id: generator.getInteger(10000000, 99999999),
                created_at: generator.getCurrentDate(),
                updated_at: generator.getCurrentDate(),
                status: 'open',
                subject: 'auto test zendesk ' + generator.getString(5),
                external_id: generator.getInteger(10000000, 99999999),
                notes: ['ticket_status:\'open\'']
            }
        };

        // store the result for later usage
        storage.set(result.ticket.id, result.ticket, 5);

        return {
            'body': JSON.stringify(result)
        };
    };
};
