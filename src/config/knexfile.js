require('dotenv').config({ path: __dirname + '/../.env' })

console.log(process.env.PGHOST_DEV)

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
      directory: '../.knex/migrations',
    },
    seeds: { directory: '../.knex/seeds' }
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
      directory: '../.knex/migrations',
    },
    seeds: { directory: '../.knex/seeds' }
  }
}