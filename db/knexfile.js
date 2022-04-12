const { path } = require('express/lib/application');

// Update with your config settings.
require('dotenv').config({path: '../.env'});
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql2',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      // directory: path.join(__dirname, './migrations'),
      tableName: 'knex_migrations'
    }
  },
};
