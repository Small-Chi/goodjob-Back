import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  Umembers: {
    type: [mongoose.ObjectId],
    ref: 'users',
    required: true
  },
  Umessages: {
    type: [
      {
        sender: {
          type: mongoose.ObjectId,
          ref: 'users',
          required: true
        },
        text: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  Omembers: {
    type: [mongoose.ObjectId],
    ref: 'owners',
    required: true
  },
  Omessages: {
    type: [
      {
        sender: {
          type: mongoose.ObjectId,
          ref: 'owners',
          required: true
        },
        text: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  }
})

export default mongoose.model('chats', schema)
