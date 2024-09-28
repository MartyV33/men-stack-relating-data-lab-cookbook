const mongoose = require('mongoose');

const pantrySchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  expirationDate: Date
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [pantrySchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;