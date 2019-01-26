'use strict'

module.exports = {
  development: {
    client: 'pg',
    connection: 'https://wallybotdb.herokuapp.com'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
