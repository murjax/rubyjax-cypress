const knex = require('../knex.js');
const COMMENT_COLUMNS = ['id', 'text', 'post_id', 'user_id'];
const PERMITTED_PARAMS = ['post_id'];

const getAll = async (params) => {
  try {
    params = permittedParams(params);
    const comments = await knex('comments')
      .join('users', 'comments.user_id', 'users.id')
      .where(params)
      .select('comments.*', 'users.first_name', 'users.last_name');

    return Promise.resolve(comments);
  } catch (error) {
    return Promise.reject({ msg: parseDatabaseError(error) });
  }
};

const create = async (data) => {
  try {
    const commentRecord = await knex('comments').insert(data, COMMENT_COLUMNS);
    return Promise.resolve(commentRecord);
  } catch (error) {
    return Promise.reject({ msg: parseDatabaseError(error) });
  }
};

const find = async (id) => {
  try {
    await validateCommentExists(id);
    const commentRecord = await knex('comments').where({ id }).first();

    return Promise.resolve(commentRecord);
  } catch (error) {
    return Promise.reject({ msg: parseDatabaseError(error) });
  }
};

const update = async (data) => {
  const id = data.id;
  delete data.id;

  try {
    await validateCommentExists(id);

    const commentRecord = await knex('comments')
      .where({ id })
      .update(data, COMMENT_COLUMNS);
    return Promise.resolve(commentRecord);
  } catch (error) {
    return Promise.reject({ msg: parseDatabaseError(error) });
  }
};

const destroy = async (id) => {
  await validateCommentExists(id);

  return knex('comments').where({ id }).del();
};

const validateCommentExists = async (id) => {
  const commentRecords = await knex('comments').where({ id });
  if (commentRecords.length === 0) {
    return Promise.reject({ msg: 'Comment not found' });
  }
};

const permittedParams = (params) => {
  return PERMITTED_PARAMS.reduce((acc, param) => {
    if (params[param]) {
      acc[param] = params[param];
    }

    return acc;
  }, {});
}

const parseDatabaseError = (error) => {
  if (error?.msg) {
    return error.msg;
  }

  if (error?.code === '23505') {
    return 'Comment already exists';
  } else if (error?.code === '42703') {
    return 'Invalid comment fields';
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
