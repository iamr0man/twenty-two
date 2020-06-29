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
  },
  rating: [
    {
      amount: {
        type: Number,
        default: 0
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  tasks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tasks'
  },
  passion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Passion'
  },
  // TODO
  // budget: {
  //   type: Array 
  // },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Language'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserScmema)