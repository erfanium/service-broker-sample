import mongoose from 'mongoose'
import config from '../../config/config'

mongoose.connect(config.mongoDB.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const schema = new mongoose.Schema({
  tweetId: {
    type: mongoose.Types.ObjectId,
    ref: 'tweet'
  },
  userName: {
    type: String,
    required: true
  }
})

export default mongoose.model('Like', schema)
