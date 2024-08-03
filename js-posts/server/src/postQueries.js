const knex = require('../knex.js');
const POST_COLUMNS = ['id', 'name', 'description', 'user_id'];

const getAll = async () => {
  try {
    const posts = await knex('posts')
      .join('users', 'posts.user_id', 'users.id')
      .select('posts.*', 'users.first_name', 'users.last_name');
    return Promise.resolve(posts);
  } catch (error) {
    return Promise.reject({ msg: parseDatabaseError(error) });
  }
};

const create = async (data) => {
  try {
    const postRecord = await knex('posts').insert(data, POST_COLUMNS);
    return Promise.resolve(postRecord);
  } catch (error) {
    return Promise.reject({ msg: parseDatabaseError(error) });
  }
};

const find = async (id) => {
  try {
    await validatePostExists(id);
    const postRecord = await knex('posts')
      .join('users', 'posts.user_id', 'users.id')
      .where('posts.id', id)
      .select('posts.*', 'users.first_name', 'users.last_name')
      .first();

    return Promise.resolve(postRecord);
  } catch (error) {
    return Promise.reject({ msg: parseDatabaseError(error) });
  }
};

const update = async (data) => {
  const id = data.id;
  delete data.id;

  try {
    await validatePostExists(id);

    const postRecord = await knex('posts')
      .where({ id })
      .update(data, POST_COLUMNS);
    return Promise.resolve(postRecord);
  } catch (error) {
    return Promise.reject({ msg: parseDatabaseError(error) });
  }
};

const destroy = async (id) => {
  await validatePostExists(id);

  return knex('posts').where({ id }).del();
};

const validatePostExists = async (id) => {
  const postRecords = await knex('posts').where({ id });
  if (postRecords.length === 0) {
    return Promise.reject({ msg: 'Post not found' });
  }
};

const parseDatabaseError = (error) => {
  if (error?.msg) {
    return error.msg;
  }

  if (error?.code === '23505') {
    return 'Post already exists';
  } else if (error?.code === '42703') {
    return 'Invalid post fields';
  }

  return 'Something went wrong';
};

module.exports = {
  getAll,
  find,
  create,
  update,
  destroy
};
