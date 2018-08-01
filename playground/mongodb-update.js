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

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b60d5cb279c116144de1356')
  }, {
    $set: {
      name: 'Kev'
    },
    $inc: {
      age: 3
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  })

  // client.close();
});