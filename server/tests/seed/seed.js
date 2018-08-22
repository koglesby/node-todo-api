const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'kev@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, '123asd').toString()
  }]
}, {
  _id: userTwoId,
  email: 'cat@example.com',
  password: 'userTwoPass'
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'second test todo',
  completed: true,
  completedAt: 4000
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
      Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};