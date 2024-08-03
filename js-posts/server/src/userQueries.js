const knex = require('../knex.js');
const bcrypt = require('bcrypt');
const USER_COLUMNS = ['id', 'email', 'first_name', 'last_name'];

const getAll = async () => {
  try {
    const users = await knex('users');
    return Promise.resolve(users);
  } catch (error) {
    return Promise.reject({ msg: parseDatabaseError(error) });
  }
};

const create = async (data) => {
  try {
    let password = data.password;
    delete data.password;

    const result = await knex('users').insert(data, USER_COLUMNS);
    const userRecord = result[0];

    await updatePassword(password, userRecord.id)

    return Promise.resolve(userRecord);
  } catch (error) {
    return Promise.reject({ msg: parseDatabaseError(error) });
  }
};

const find = async (id) => {
  try {
    await validateUserExists(id);
    const userRecord = await knex('users').where({ id }).first();
    return Promise.resolve(userRecord);
  } catch (error) {
    return Promise.reject({ msg: parseDatabaseError(error) });
  }
};

const findByEmail = async (email) => {
  try {
    const userRecord = await knex('users').where({ email }).first();
    return Promise.resolve(userRecord);
  } catch (error) {
    return Promise.reject({ msg: parseDatabaseError(error) });
  }
};

const update = async (data) => {
  const id = data.id;
  delete data.id;

  try {
    await validateUserExists(id);

    let password = data.password;
    delete data.password;

    const result = await knex('users')
      .where({ id })
      .update(data, USER_COLUMNS);
    const userRecord = result[0];

    await updatePassword(password, id)

    return Promise.resolve(userRecord);
  } catch (error) {
    return Promise.reject({ msg: parseDatabaseError(error) });
  }
};

const destroy = async (id) => {
  await validateUserExists(id);

  return knex('users').where({ id }).del();
};

const validateUsersExists = async (id) => {
  const userRecords = await knex('users').where({ id });
  if (userRecords.length === 0) {
    return Promise.reject({ msg: 'User not found' });
  }
};

const validateUserExists = async (id) => {
  const userRecords = await knex('users').where({ id });
  if (userRecords.length === 0) {
    return Promise.reject({ msg: 'User not found' });
  }
};

const updatePassword = async (password, userId) => {
  if (!password) { return Promise.resolve(); }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return knex('users')
    .where({ id: userId })
    .update({ encrypted_password: hash }, ['encrypted_password']);
}

const parseDatabaseError = (error) => {
  if (error?.msg) {
    return error.msg;
  }

  if (error?.code === '23505') {
    return 'User already exists';
  } else if (error?.code === '42703') {
    return 'Invalid user fields';
  }

  return 'Something went wrong';
};

module.exports = {
  getAll,
  find,
  findByEmail,
  create,
  update,
  destroy
};
