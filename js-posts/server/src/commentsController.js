const queries = require('./commentQueries');

const index = async (request, response) => {
  try {
    const results = await queries.getAll(request.query);
    response.status(200).json(results);
  } catch (error) {
    const status = parseErrorStatus(error);
    response.status(status).json(error)
  }
};

const show = async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    const result = await queries.find(id);
    response.status(200).json(result);
  } catch (error) {
    const status = parseErrorStatus(error);
    response.status(status).json(error)
  }
};

const create = async(request, response) => {
  const data = { user_id: request.currentUserId, ...request.body };
  try {
    const result = await queries.create(data);
    response.status(201).json(result);
  } catch (error) {
    const status = parseErrorStatus(error);
    response.status(status).json(error);
  }
};

const update = async(request, response) => {
  const data = request.body;
  try {
    const result = await queries.update(data);
    response.status(200).json(result);
  } catch (error) {
    const status = parseErrorStatus(error);
    response.status(status).json(error);
  }
};

const destroy = async(request, response) => {
  const id = parseInt(request.params.id);

  try {
    const result = await queries.destroy(id);
    response.status(204).send();
  } catch (error) {
    const status = parseErrorStatus(error);
    response.status(status).json(error);
  }
};

const parseErrorStatus = (error) => {
  switch (error?.msg) {
    case 'Comment not found':
      return 404;
    case 'Invalid fields':
    case 'Comment already exists':
      return 422;
    default:
      return 500;
  }
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
