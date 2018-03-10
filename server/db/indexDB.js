const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;

Mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/todoapp');

module.exports = { Mongoose };
