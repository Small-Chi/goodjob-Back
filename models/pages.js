import mongoose from 'mongoose'

const pageSchema = new mongoose.Schema(
  {
    image: {
      type: String
    },
    username: {
      type: String
    },
    date: {
      type: Date
    }
  },
  { versionKey: false }
)

export default mongoose.model('pages', pageSchema)
