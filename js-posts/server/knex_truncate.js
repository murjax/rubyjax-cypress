require('dotenv').config();
const knex = require('knex')({
  client: 'postgresql',
  connection: process.env.DB_URL,
});


async function truncateAllTables() {
  try {
    await knex.raw('START TRANSACTION');

    const tables = await knex
      .select('tablename')
      .from('pg_tables')
      .where('schemaname', 'public')
      .whereNot('tablename', 'like', 'knex%');

    for (const { tablename } of tables) {
      await knex.raw(`TRUNCATE TABLE "${tablename}" CASCADE`);
      console.log(`Truncated table: ${tablename}`);
    }

    await knex.raw('COMMIT');

    console.log('All tables have been truncated successfully.');
  } catch (error) {
    await knex.raw('ROLLBACK');
    console.error('Error truncating tables:', error);
  } finally {
    process.exit(0);
  }
}

truncateAllTables();
