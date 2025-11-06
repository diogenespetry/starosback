exports.up = function (knex) {
  return knex.schema.createTable("clientes", (table) => {
    table.increments("id").primary();
    table.string("nome").notNullable();
    table.text("description").notNullable();
    table.string("telefone").notNullable();
    table.string("email").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("clientes");
};
