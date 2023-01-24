'use strict'

const status = require('http-status')

const exchange = require('../adapters/exchange.adapter')
const explorer = require('../adapters/explorer.adapter')
const { isTransactionId } = require('../modules/utils.module')
const {
  transformAddress,
  transformTransaction,
} = require('../transformers/search.transform')

exports.get = async (request, h) => {
  try {
    const { id } = request.params
    const { currency } = request.query

    if (isTransactionId(id)) {
      const [transaction, latestBlock, rates] = await Promise.all([
        explorer.transaction(id),
        explorer.latestBlock(),
        exchange.getTicker(),
      ])

      return transformTransaction(transaction, latestBlock, currency, rates)
    } else {
      const [address, rates] = await Promise.all([
        explorer.address(id),
        exchange.getTicker(),
      ])

      return transformAddress(address, currency, rates)
    }
  } catch (error) {
    // TODO log the error
    // console.log(error);
    return h.response().code(status.INTERNAL_SERVER_ERROR)
  }
}
