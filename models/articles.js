import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
  image: {
    type: String
  },
  title: {
    type: String
  },
  author: {
    type: String
  },
  date: {
    type: Date
  },
  point: {
    type: String
  },
  content: {
    type: String
  }
}, { versionKey: false })

export default mongoose.model('articles', articleSchema)
