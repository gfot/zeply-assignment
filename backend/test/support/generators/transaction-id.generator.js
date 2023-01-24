'use strict'

const crypto = require('crypto')

const { BTC_TRANSACTION_LENGTH } = require('../../../lib/constants')

module.exports = function (length = BTC_TRANSACTION_LENGTH) {
  const ALWAYS_GENERATE_128_LENGTH_HEX = 64
  return crypto
    .randomBytes(ALWAYS_GENERATE_128_LENGTH_HEX)
    .toString('hex')
    .slice(length)
}
