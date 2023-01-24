'use strict'

const Big = require('big.js')

const BTC_SATS_CONVERSION = 100_000_000

exports.toBitcoin = (satoshi) => {
  let satoshiType = typeof satoshi
  if (satoshiType === 'string') {
    satoshi = Number(satoshi)
    satoshiType = 'number'
  }
  if (satoshiType !== 'number') {
    throw new TypeError(
      'toBitcoin must be called on a number or string, got ' + satoshiType
    )
  }
  if (!Number.isInteger(satoshi)) {
    throw new TypeError(
      'toBitcoin must be called on a whole number or string format whole number'
    )
  }

  const bigShatoshi = new Big(satoshi)
  return Number(bigShatoshi.div(BTC_SATS_CONVERSION))
}

exports.toSatoshi = (bitcoin) => {
  let bitcoinType = typeof bitcoin
  if (bitcoinType === 'string') {
    bitcoin = Number(bitcoin)
    bitcoinType = 'number'
  }

  if (bitcoinType !== 'number' || Number.isNaN(bitcoin)) {
    throw new TypeError(
      'toSatoshi must be called on a number or string, got ' +
        (Number.isNaN(bitcoin) ? 'NaN' : bitcoinType)
    )
  }

  const bigBitcoin = new Big(bitcoin)
  return Number(bigBitcoin.times(BTC_SATS_CONVERSION))
}

exports.multiply = (val1, val2, dp = 2) => {
  return Number(new Big(val1).times(val2).toFixed(dp))
}

exports.divide = (val1, val2, dp = 2) => {
  return Number(new Big(val1).div(val2).toFixed(dp))
}
