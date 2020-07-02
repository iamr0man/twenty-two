const mongoose = require('mongoose')

const ProfileScmema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
  tasks: [
    {
      task: [
        {
          name: String,
          color: String,
          type: {
            type: String,
            enum: ['main', 'secondary']
          },
          status: {
            type: String,
            enum: ['completed', 'not finished']
          }
        }
      ],
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  passion: [
    {
      image: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  budget: [
    {
      category: {
        type: mongoose.Schema.Types.ObjectId,
        name: 'Category'
      },
      money: {
        type: String,
        require: true
      },
      day: {
        type: Date,
        require: true
      },
      note: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
      // location: {
      //   longitude: String,
      //   lantitude: String
      // }
    },
  ],
  language: [
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
        type: [String],
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

module.exports = mongoose.model('Profile', ProfileScmema)