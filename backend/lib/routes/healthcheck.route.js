'use strict'

const healthcheckHandler = require('../handlers/healthcheck.handler')

module.exports = {
  method: 'GET',
  path: '/healthcheck',
  handler: healthcheckHandler.get,
  options: {
    description: 'Check server health',
  },
}
