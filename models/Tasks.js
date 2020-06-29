const mongoose = require('mongoose')

const TasksScmema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  value: [
    {
      name: String,
      color: String,
      type: {
        type: String,
        enum: ['main', 'secoundary']
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Tasks', TasksScmema)