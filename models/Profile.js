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
  manager: [
    {
      tasks: [
        {
          name: String,
          relationships: [
            {
              kind: {
                type: String,
                enum: ['family', 'career', 'sleep', 'friends', 'fitness']
              },
              amount: {
                type: Number,
                min: 0,
                max: 3
              }
            },
          ],
          labels: [
            {
              name: String,
              color: String,
            }
          ],
          subtasks: [
            {
              name: String,
              status: {
                type: String,
                enum: ['completed', 'not finished'],
                default: 'not finished'
              }
            }
          ],
          type: {
            type: String,
            enum: ['main', 'secondary']
          },
          status: {
            type: String,
            enum: ['completed', 'not finished'],
            default: 'not finished'
          },
          notes: {
           type: String,
           default: '' 
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
      name: {
        type: String,
        default: ''
      },
      image: {
        type: String,
        default: ''
      },
      resource: {
        type: String,
        default: 'work'
      },
      level: {
        type: String,
        enum: ['essential', 'medium', 'advanced'],
        default: 'essential'
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
        ref: 'Category'
      },
      name: {
        type: String,
        required: true
      },
      money: {
        type: String,
        required: true
      },
      note: {
        type: String
      },
      createdAt: {
        type: Date,
        required: true
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