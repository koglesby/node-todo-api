const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// set mongoose up to use promises

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true });

module.exports = {mongoose};