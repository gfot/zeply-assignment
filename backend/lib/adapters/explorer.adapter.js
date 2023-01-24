'use strict'

const blockexplorer = require('blockchain.info/blockexplorer')

exports.address = async (id, options = {}) => {
  const info = await blockexplorer.getAddress(id, options)
  return info
}

exports.transaction = async (id, options = {}) => {
  const info = await blockexplorer.getTx(id, options)
  return info
}

exports.latestBlock = async (options = {}) => {
  const info = await blockexplorer.getLatestBlock(options)
  return info
}
