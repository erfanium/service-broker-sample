import Tweet from '../Tweet.model'

export default async function () {
  return Tweet.find()
}