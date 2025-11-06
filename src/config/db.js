require('dotenv').config();

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
    charset: "utf8mb4",
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './database/migrations',
  },
  seeds: {
    tableName: 'knex_seeds',
    directory: './database/seeds',
  },
});

// ✅ Exporta de forma dupla: direta e nomeada
module.exports = knex;
module.exports.knex = knex;
