require('dotenv').config({ path: '../.env' })

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PGHOST_DEV,
      user: process.env.PGUSER_DEV,
      password: process.env.PGPASS_DEV,
      database: process.env.PGDB_DEV
    },
    migrations: {
      directory: 'model/migrations',
    }//,
    //seeds: { directory: './data/seeds' }
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.PGHOST_DEV,
      user: process.env.PGUSER_DEV,
      password: process.env.PGPASS_DEV,
      database: process.env.PGDB_DEV
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'model/migrations',
    }//,
    //seeds: { directory: './data/seeds' }
  }
}