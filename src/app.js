require('dotenv').config()

import restify from 'restify';
import Router from './routes';
import Sequelize from 'sequelize';


class Server {
  constructor() {
    let port = process.env.PORT || 3000
    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: 'localhost',
        dialect: 'postgres'
      }
    )

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
    this.router = new Router(this.server);

    this.server.listen(port, (err) => {
      if (err)
        console.error(err);
      else
        console.log('App is ready at : ' + port);
    })

    if (process.env.environment == 'production') {
      process.on('uncaughtException', (err) =>
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
      )
    }
  }
}

new Server();