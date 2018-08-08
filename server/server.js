//Library imports
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// Local imports
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }).catch((e) => {
    res.status(400).send(e)
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    console.log("invalid id");
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    // console.log(todo);
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo: todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.delete('/todos/:id', (req,res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    console.log("invalid id");
    return res.status(404).send();
  }

  Todo.findByIdAndDelete(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});

  })
    .catch((e) => {
      res.status(400).send();
    })
});

app.listen(port, () => {
  console.log('started on port ' + port);
});

module.exports = {app};