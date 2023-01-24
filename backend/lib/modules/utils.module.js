'use strict'

const { BTC_TRANSACTION_LENGTH } = require('../constants')

exports.isTransactionId = (id) => {
  return typeof id === 'string' && id.length === BTC_TRANSACTION_LENGTH
}
