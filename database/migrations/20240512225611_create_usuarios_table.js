exports.up = function (knex) {
  return knex.schema.createTable("usuarios", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("senha").notNullable();
    table.enum("access_level", ["ADM", "USER"]).notNullable().defaultTo("USER");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("usuarios");
};
