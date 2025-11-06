const { Model } = require('objection');

class Status extends Model {
  static get tableName() {
    return 'status_tickets';
  }
}

module.exports = { Status };
