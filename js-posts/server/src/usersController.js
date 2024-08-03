const queries = require('./userQueries');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const index = async (request, response) => {
  try {
    const results = await queries.getAll();
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
  const data = request.body;
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

const login = async(request, response) => {
  const { email, password } = request.body
  const user = await queries.findByEmail(email);

  let status = 401;
  let responseBody = { message: 'Invalid Credentials' };

  if (user) {
    const authValid = await bcrypt.compare(password, user.encrypted_password);

    if (authValid) {
      status = 200;
      token = jwt.sign({ id: user.id, email: user.email }, 'tokensecret');
      responseBody = { message: 'Authenticated', token };
    }
  }

  response.status(status).send(responseBody);
};

const parseErrorStatus = (error) => {
  switch (error?.msg) {
    case 'User not found':
      return 404;
    case 'Invalid fields':
    case 'User already exists':
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
  destroy,
  login
}
