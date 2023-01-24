'use strict'

const status = require('http-status')

exports.get = async (_, h) => {
  return h.response().code(status.OK)
}
