exports.up = function (knex) {
  return knex.schema.alterTable("ticket_interacao", function (table) {
    table.dropColumn("subject");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("ticket_interacao", (t) => {
    t.string("subject").notNullable();
  });
};
