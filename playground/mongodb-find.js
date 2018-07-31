// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// let obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDb server');
  const db = client.db('TodoApp');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5b60bbf5d8d11b5dd08bcb4a')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, null, 2));
  // }, (err) => {
  //   console.log('unable to fetch to-dos', err)
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log('Todos');
  //   console.log('Todos count: ' + count);
  // }, (err) => {
  //   console.log('unable to fetch to-dos', err)
  // });
  db.collection('Users').find({name: 'Kevin'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, null, 2));
  }, (err) => {
    console.log('unable to fetch to-dos', err)
  });

  // client.close();
});