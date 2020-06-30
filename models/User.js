const mongoose = require('mongoose')

const UserScmema = mongoose.Schema({
  // googleId: {
  //   type: String,
  //   required: true
  // },
  displayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
})

module.exports = mongoose.model('User', UserScmema)