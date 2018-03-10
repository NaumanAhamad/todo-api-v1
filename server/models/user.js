const Mongoose = require('mongoose');

const User = Mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

module.exports = { User };
