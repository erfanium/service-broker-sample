import like from './services/like/Like.service'
import tweet from './services/tweet/Tweet.service'
import apiGateway from './services/apiGateway/apiGateway.service'

import serviceBroker from './serviceBroker'

serviceBroker.addServices({
  like: like,
  tweet: tweet,
  apiGateway: apiGateway
})

