require('dotenv').config();
const knex = require('knex')({
  client: 'postgresql',
  connection: process.env.DB_SETUP_URL,
});

knex
  .raw('CREATE DATABASE posts;')
  .catch((error) => console.log('Unable to create database posts. Proceeding assuming it already exists.'))
  .finally(() => process.exit(0));
