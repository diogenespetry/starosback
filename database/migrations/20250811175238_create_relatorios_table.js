// migrations/20250811174246_relatorios.js
exports.up = function(knex) {
  return knex.schema.createTable('relatorios', function(table) {
    table.increments('id').primary();

    // Relaciona com usuário que criou o relatório
    table
      .integer('usuario_id')
      .unsigned()
      .references('id')
      .inTable('usuarios')
      .onDelete('CASCADE');

    // Relaciona com ticket (opcional)
    table
      .integer('ticket_id')
      .unsigned()
      .references('id')
      .inTable('tickets')
      .onDelete('CASCADE');

    table.string('titulo').notNullable();
    table.text('descricao').nullable();
    table.dateTime('data_inicio').nullable();
    table.dateTime('data_fim').nullable();

    table.timestamp('criado_em').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('relatorios');
};
