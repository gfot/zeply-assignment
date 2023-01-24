'use strict'

const { init } = require('./lib/api')

let server

const start = async () => {
  server = await init()

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

const stop = async () => {
  await server.stop()
}

process.on('SIGINT', () => {
  stop()
})

process.on('SIGTERM', () => {
  stop()
})

start()
