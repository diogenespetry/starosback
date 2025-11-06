const { knex } = require("@/config/db");
const { Model } = require("objection");

Model.knex(knex);

class TicketInteracao extends Model {
  static get tableName() {
    return "ticket_interacao";
  }
  static get idColumn() {
    return "id";
  }
}

module.exports.TicketInteracao = TicketInteracao;
