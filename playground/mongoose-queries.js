const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '5b678b68949bd4548c176da4';
//
// if(!ObjectID.isValid(id)) {
//   console.log('invalid ID');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos ', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo ', todo);
// });
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by id', todo);
// }).catch((e) => console.log(e));

User.findById('5b620f13bfcc265d80d67622').then((user) => {
  if (!user) {
    return console.log('User Id not found');
  }
  console.log('User by id', JSON.stringify(user, null, 2));
}).catch((e) => console.log(e));