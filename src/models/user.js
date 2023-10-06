const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  identification: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true

  }
});

module.exports = mongoose.model('User', userSchema);