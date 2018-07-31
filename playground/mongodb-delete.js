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

  // db.collection('Todos').deleteMany({text: 'Smog Check'}).then((result) => {
  //   console.log(result);
  // })
  // db.collection('Todos').deleteOne({text: 'Laundry'}).then((result) => {
  //   console.log(result);
  // })
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').deleteMany({name: "Kevin"});

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5b60befaeb395a1340f97eb2')})
    .then((result) => {
      console.log(result);
    });

  // client.close();
});