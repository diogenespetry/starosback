// src/models/Relatorio.js
const { Model } = require('objection');
const Ticket = require('./ticketModel');

class Relatorio extends Model {
  static get tableName() {
    return 'relatorios';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      ticket: {
        relation: Model.BelongsToOneRelation,
        modelClass: Ticket,
        join: {
          from: 'relatorios.ticket_id',
          to: 'tickets.id'
        }
      }
    };
  }
}

module.exports = Relatorio;
