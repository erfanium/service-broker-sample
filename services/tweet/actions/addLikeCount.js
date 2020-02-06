import Tweet from '../Tweet.model'

export default async function (ctx) {
  return Tweet.findByIdAndUpdate({
    _id: ctx.params.tweetId
  }, {
    $inc: {
      likeCount: 1
    }
  })
}