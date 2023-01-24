'use strict'

const exchange = require('blockchain.info/exchange')

exports.getTicker = async (options = {}) => {
  const info = await exchange.getTicker(options)
  return info
}
