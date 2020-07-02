const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expenses'],
    required: true
  },
  color: {
    type: String,
    required: true
  },
  // logo: {
  //   type: String,
  //   required: true
  // }
})

module.exports = mongoose.model('Category', CategorySchema)