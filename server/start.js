'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const path = require('path')

const pkg = require('../package.json')

const app = express()

if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (non-production only)
  app.use(require('volleyball'))
}

module.exports = app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  .use(express.static(resolve(__dirname, '..', 'public'))) // Serve static files from ../public
  .use('/bootstrap', express.static(resolve(__dirname, '..', 'node_modules/bootstrap/dist'))) // Serve static files bootstrap
  .use('/jquery', express.static(resolve(__dirname, '..', 'node_modules/jquery/dist'))) // Serve static files jquery

  .use('/api', require('./api')) // Serve our api

  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

  //error handling
  app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });

if (module === require.main) {

  const server = app.listen(
    process.env.PORT || 1337,
    () => {
      console.log(`--- Started HTTP Server for ${pkg.name} ---`)
      console.log(`Listening on ${JSON.stringify(server.address())}`)
    }
  )
}
