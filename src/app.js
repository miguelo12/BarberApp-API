require('dotenv').config()

import restify from 'restify'
import Knex from 'knex'
import {
  Model,
  ValidationError,
  NotFoundError,
  DBError,
  ConstraintViolationError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError 
} from 'objection'
import Router from './routes'
import KnexConfig from './knexfile'

class Server {
  constructor() {
    let port = process.env.PORT || 3000
    
    if (!process.env.environment) process.env.environment = "development"
    console.log(`The database initialize in mode ${process.env.environment}`)

    const knex = new Knex(
      process.env.environment == 'production' ? KnexConfig.production : KnexConfig.development
    )

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

    function errorHandler(err, res) {
      if (err instanceof ValidationError) {
        switch (err.type) {
          case 'ModelValidation':
            res.status(400).send({
              message: err.message,
              type: err.type,
              data: err.data
            });
            break;
          case 'RelationExpression':
            res.status(400).send({
              message: err.message,
              type: 'RelationExpression',
              data: {}
            });
            break;
          case 'UnallowedRelation':
            res.status(400).send({
              message: err.message,
              type: err.type,
              data: {}
            });
            break;
          case 'InvalidGraph':
            res.status(400).send({
              message: err.message,
              type: err.type,
              data: {}
            });
            break;
          default:
            res.status(400).send({
              message: err.message,
              type: 'UnknownValidationError',
              data: {}
            });
            break;
        }
      } else if (err instanceof NotFoundError) {
        res.status(404).send({
          message: err.message,
          type: 'NotFound',
          data: {}
        });
      } else if (err instanceof UniqueViolationError) {
        res.status(409).send({
          message: err.message,
          type: 'UniqueViolation',
          data: {
            columns: err.columns,
            table: err.table,
            constraint: err.constraint
          }
        });
      } else if (err instanceof NotNullViolationError) {
        res.status(400).send({
          message: err.message,
          type: 'NotNullViolation',
          data: {
            column: err.column,
            table: err.table
          }
        });
      } else if (err instanceof ForeignKeyViolationError) {
        res.status(409).send({
          message: err.message,
          type: 'ForeignKeyViolation',
          data: {
            table: err.table,
            constraint: err.constraint
          }
        });
      } else if (err instanceof CheckViolationError) {
        res.status(400).send({
          message: err.message,
          type: 'CheckViolation',
          data: {
            table: err.table,
            constraint: err.constraint
          }
        });
      } else if (err instanceof DataError) {
        res.status(400).send({
          message: err.message,
          type: 'InvalidData',
          data: {}
        });
      } else if (err instanceof DBError) {
        res.status(500).send({
          message: err.message,
          type: 'UnknownDatabaseError',
          data: {}
        });
      } else {
        res.status(500).send({
          message: err.message,
          type: 'UnknownError',
          data: {}
        });
      }
    }
  }
}

new Server();