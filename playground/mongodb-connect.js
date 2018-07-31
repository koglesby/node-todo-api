// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

let obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDb server');
  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'Grocery Shopping',
  //   completed: false
  // },(err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert to-do');
  //   }
  //
  //   console.log(JSON.stringify(result.ops, null, 2))
  // });

  // db.collection('Users').insertOne({
  //   name: 'Kevin',
  //   age: 27,
  //   location: 'Sacramento'
  // },(err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user');
  //   }
  //
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  client.close();
});