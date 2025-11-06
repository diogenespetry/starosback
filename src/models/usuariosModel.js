const { Model } = require("objection");

class Usuario extends Model {
  static get tableName() {
    return "usuarios";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = { Usuario };
