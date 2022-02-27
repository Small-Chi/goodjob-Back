import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema({
  username: {
    type: mongoose.ObjectId,
    ref: 'users'
  },
  ownername : {
    type: mongoose.ObjectId,
    ref: 'owners'
  },
  date: {
    type: Date
  },
  title: {
    type: String
  },
  content: {
    type: String
  }
}, { versionKey: false })

export default mongoose.model('reports', reportSchema)
