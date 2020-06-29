const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tasks"
  },
  name: String,
  color: String,
  type: {
    type: String,
    enum: ['main', 'secoundary']
  },
  status: {
    type: String,
    enum: ['completed', 'not finished']
  }
})

module.exports = mongoose.model('Task', TaskSchema)