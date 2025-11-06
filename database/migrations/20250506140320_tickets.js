exports.up = function (knex) {
  return knex.schema.createTable("tickets", (t) => {
    t.increments("id");
    t.string("title").notNullable();
    t.text("description");
    t.integer("status")
      .unsigned()
      .references("id")
      .inTable("status_tickets")
      .onDelete("CASCADE")
      .index()
      .notNullable()
      .defaultTo(1);
    t.integer("usuario_id")
      .unsigned()
      .references("id")
      .inTable("usuarios")
      .onDelete("CASCADE")
      .index()
      .notNullable();
    t.integer("cliente_id")
      .unsigned()
      .references("id")
      .inTable("clientes")
      .onDelete("CASCADE")
      .index()
      .nullable();
    t.timestamp("data_created").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tickets");
};
