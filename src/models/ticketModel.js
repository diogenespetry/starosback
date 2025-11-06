const { knex } = require("../config/db");
const { Model } = require("objection");
const Cliente = require("./clientesModel");
Model.knex(knex);

class Ticket extends Model {
  static get tableName() {
    return "tickets";
  }
  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    const { Status } = require("./statusModel");
    const { Usuario } = require("./usuariosModel");

    return {
      status_ticket: {
        relation: Model.HasOneRelation,
        modelClass: Status,
        join: {
          from: "status_tickets.id",
          to: "tickets.status"
        }
      },
      cliente: {
        relation: Model.HasOneRelation,
        modelClass: Cliente,
        join: {
          from: "tickets.cliente_id",
          to: "clientes.id"
        }
      },
      usuario: {
        relation: Model.HasOneRelation,
        modelClass: Usuario,
        join: {
          from: "tickets.usuario_id",
          to: "usuarios.id"
        }
      }
    };
  }
}

module.exports.Ticket = Ticket;
