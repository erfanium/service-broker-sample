import Like from '../Like.model'
import serviceBroker from '../../../serviceBroker'

export default async function (ctx) {
  const like = await Like.create({
    userName: ctx.params.userName,
    tweetId: ctx.params.tweetId
  })

  serviceBroker.call('tweet.addLikeCount', {
    tweetId: ctx.params.tweetId
  })

  return like
}
