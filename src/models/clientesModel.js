const {knex} = require("../config/db")
const { Model } = require('objection');
Model.knex(knex);

class Clientes extends Model {
  static get tableName() {
      return 'clientes';
  }
  static get idColumn() {
      return 'id';
  }
}

module.exports = Clientes;
