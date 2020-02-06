import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

class ServiceBroker {
  constructor() {
    this.services = {}
  }

  addServices(services) {
    this.services = {
      ...this.services,
      ...services
    }
  }

  call(endPointName, params) {
    const [serviceName, actionName] = endPointName.split('.')
    const service = this.services[serviceName]

    if (!service) {
      throw new Error(`called Service ${serviceName} not found`)
    }

    console.log(`calling ${endPointName}`)

    if (typeof service === 'string') {
      // link external
      const serviceUrl = service
      return axios
        .post(`${serviceUrl}/${serviceName}/${actionName}`, params)
        .then(result => result.data)
        .catch(e => {
          if (!e.response) throw new Error(`Service ${serviceName} is down!`)
          throw new Error({
            name: e.response.name,
            message: e.response.message
          })
        })
    } else {
      if (!service.actions) throw new Error(`service ${serviceName} has no action`)
      const action = service.actions[actionName]
      if (!action) throw new Error(`action ${actionName} not found in service ${serviceName}`)
      return action({ params })
    }
  }

  host(port, cb) {
    const server = express()

    server.use(bodyParser.json())

    server.post('/:serviceName/:actionName', (req, res) => {
      this.call(`${req.params.serviceName}.${req.params.actionName}`, req.body)
        .then(result => res.status(200).send(result))
        .catch(err => {
          console.error(err)
          res.status(500).send({
            Error: {
              name: err.name,
              message: err.message
            }
          })
        })
    })

    server.listen(port, cb)
  }
}

export default new ServiceBroker()
