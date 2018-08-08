const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({}).then((result) => {
  console.log(result);
});
// with .remove() we don't get the docs back, just a number of items

Todo.findOneAndRemove({_id: '5b6a1aa084bf6a5a1475e9d4'}).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('5b6a1aa084bf6a5a1475e9d4').then((todo) => {
  console.log(todo);
});