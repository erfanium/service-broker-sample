import express from 'express'
import bodyParser from 'body-parser'
import serviceBroker from '../../serviceBroker'
import config from '../../config/config'

const server = express()

const port = config.apiGateway.port //todo

function callService(target) {
  return (req, res) => serviceBroker
    .call(target, { ...req.params, ...req.body })
    .then(result => res.status(200).send(result))
    .catch(err => {
      console.error(err)
      res.status(500).send({
        name: err.name,
        message: err.message
      })
    })
}

server.use(bodyParser.json())

server.get('/tweet', callService('tweet.getAll'))
server.post('/tweet', callService('tweet.create'))
server.post('/tweet/:tweetId/like', callService('like.add'))

server.listen(port, () =>
  console.log('service api gateway listened on port 3000')
)
