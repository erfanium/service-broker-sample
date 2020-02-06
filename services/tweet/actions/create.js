import Tweet from '../Tweet.model'

export default async function (ctx) {
  return Tweet.create({
    userName: ctx.params.userName,
    text: ctx.params.text
  })
}