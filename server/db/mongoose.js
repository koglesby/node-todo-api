const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// set mongoose up to use promises

mongoose.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true });

module.exports = {mongoose};