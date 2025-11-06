exports.up = function (knex) {
  return knex.schema.createTable("ticket_interacao", (t) => {
    t.increments("id").primary();
    t.string("subject").notNullable();
    t.text("description");
    t.integer("ticket_id")
      .unsigned()
      .references("id")
      .inTable("tickets")
      .onDelete("CASCADE")
      .index()
      .notNullable();
    t.timestamp("date").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    t.integer("user_id")
      .unsigned()
      .references("id")
      .inTable("usuarios")
      .onDelete("CASCADE")
      .index()
      .notNullable();
    t.integer("status_id")
      .unsigned()
      .references("id")
      .inTable("status_tickets")
      .onDelete("CASCADE")
      .index()
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("ticket_interacao");
};
