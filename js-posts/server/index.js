const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const postsController = require('./src/postsController');
const commentsController = require('./src/commentsController');
const usersController = require('./src/usersController');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json()); //used for POST/PUT
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const authenticateUser = (request, response, next) => {
  const token = request.headers.authorization;

  if (token) {
    jwt.verify(token, 'tokensecret', (err, user) => {
      if (err) {
        response.status(401).send();
        return;
      }

      request.currentUserId = user.id

      next();
    });
  } else {
    response.status(401).send();
  }
};

app.get('/posts', authenticateUser, postsController.index);
app.get('/posts/:id', authenticateUser, postsController.show);
app.post('/posts', authenticateUser, postsController.create);
app.put('/posts/:id', authenticateUser, postsController.update);
app.delete('/posts/:id', authenticateUser, postsController.destroy);

app.get('/comments', authenticateUser, commentsController.index);
app.get('/comments/:id', authenticateUser, commentsController.show);
app.post('/comments', authenticateUser, commentsController.create);
app.put('/comments/:id', authenticateUser, commentsController.update);
app.delete('/comments/:id', authenticateUser, commentsController.destroy);

app.get('/users', usersController.index);
app.get('/users/:id', usersController.show);
app.post('/users', usersController.create);
app.put('/users/:id', usersController.update);
app.delete('/users/:id', usersController.destroy);
app.post('/login', usersController.login);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
