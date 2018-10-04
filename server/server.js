require('./config/config');
//Library imports
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
require('cache-require-paths');

// Local imports
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

let app = express();
let port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo
    .save()
    .then(doc => {
      res.send(doc);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.send({ todos });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    console.log('invalid id');
    return res.status(404).send();
  }

  Todo.findById(id)
    .then(todo => {
      // console.log(todo);
      if (!todo) {
        return res.status(404).send();
      }
      res.status(200).send({ todo: todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    console.log('invalid id');
    return res.status(404).send();
  }

  Todo.findByIdAndDelete(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.status(200).send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);
  // Creates an object composed of the picked object properties.
  // { text: req.body.text, completed: req.body.completed }

  if (!ObjectID.isValid(id)) {
    console.log('invalid id');
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    // checks if body.completed is a boolean value(not null or another type)
    // and if completed is true
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

// POST /users , _.pick()
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log('started on port ' + port);
});

module.exports = { app };
