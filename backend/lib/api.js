'use strict'

const hapi = require('@hapi/hapi')

const liveDataPlugin = require('./plugins/live-data-plugin')
const healthcheckRoute = require('./routes/healthcheck.route')
const searchRoute = require('./routes/search.route')

exports.init = async () => {
  const server = hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: true, // TODO only for local dev
    },
  })

  await server.register(liveDataPlugin)

  server.route([healthcheckRoute, searchRoute])
  return server
}
