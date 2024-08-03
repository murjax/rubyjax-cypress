require('dotenv').config();
const knex = require('knex')({
  client: 'postgresql',
  connection: process.env.DB_SETUP_URL,
});

knex
  .raw('DROP DATABASE posts;')
  .catch((error) => console.log('Unable to drop database posts. Proceeding assuming it does not exist yet.'))
  .finally(() => process.exit(0));
