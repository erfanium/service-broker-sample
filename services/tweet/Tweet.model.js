import mongoose from 'mongoose'
import config from '../../config/config'

mongoose.connect(config.mongoDB.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const schema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  likeCount: {
    type: Number,
    default: 0
  }
})

export default mongoose.model('Tweet', schema)