module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.PG_CONNECTION_DEV
  },
  production: {
    client: 'postgresql',
    connection: process.env.PG_CONNECTION_PROD,
    pool: {
      min: 2,
      max: 10
    }
  }
}