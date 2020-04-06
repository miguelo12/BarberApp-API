import restify from 'restify'
import Knex from 'knex'
import { Model } from 'objection'
import Routers from './router/routes'
import KnexConfig from './config/knexfile'
import jwt from 'jsonwebtoken'

class Server {
  constructor() {
    let port = process.env.PORT || 3000
    
    if (!process.env.environment) process.env.environment = "development"
    console.log(`The database initialize in mode ${process.env.environment}`)

    const knex = new Knex(KnexConfig[process.env.environment])

    Model.knex(knex)

    // define restify serve
    this.server = restify.createServer({
      name: 'Barberapp',
      versions: ['1.0.0']
    })

    // Restify middleware
    this.server.use(restify.plugins.acceptParser(this.server.acceptable))
    this.server.use(restify.plugins.queryParser())
    this.server.use(restify.plugins.bodyParser())
    
    // load all routes
    var router = new Routers(jwt)
    router.applyRoutes(this.server)
    
    this.server.listen(port, (err) => {
      if (err)
        console.error(err)
      else
        console.log('App is ready at : ' + port)
    })

    if (process.env.environment == 'production') {
      process.on('uncaughtException', (err) =>
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
      )
    }
  }
}

new Server()