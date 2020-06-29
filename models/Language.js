const mongoose = require('mongoose')

const LanguageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  value: [
    {
      videoLink: {
        type: String,
        default: ''
      },
      articleLink: {
        type: String,
        default: ''
      },
      words: {
        type: Array,
        default: []
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Language', LanguageSchema)