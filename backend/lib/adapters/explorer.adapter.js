'use strict'

const Bourne = require('@hapi/bourne')
const blockexplorer = require('blockchain.info/blockexplorer')

exports.address = async (id, options = {}) => {
  try {
    return await blockexplorer.getAddress(id, options)
  } catch (error) {
    throw new Error(
      Bourne.safeParse(error)?.message ?? 'Could not fetch address'
    )
  }
}

exports.transaction = async (id, options = {}) => {
  try {
    return await blockexplorer.getTx(id, options)
  } catch (error) {
    throw new Error(
      Bourne.safeParse(error)?.message ?? 'Could not fetch transaction'
    )
  }
}

exports.latestBlock = async (options = {}) => {
  try {
    return await blockexplorer.getLatestBlock(options)
  } catch (error) {
    throw new Error(
      Bourne.safeParse(error)?.message ?? 'Could not fetch latest block'
    )
  }
}
