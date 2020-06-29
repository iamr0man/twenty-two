const mongoose = require('mongoose')

const TasksSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  value: [
    {
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Board', TasksSchema)