'use strict'

const { validate } = require('bitcoin-address-validation')
const joi = require('joi')

const { BTC_TRANSACTION_LENGTH } = require('../constants')

exports.transactionId = () => joi.string().hex().length(BTC_TRANSACTION_LENGTH)

exports.addressId = () =>
  joi.string().custom((value, helpers) => {
    if (!validate(value)) {
      return helpers.error('any.invalid')
    }
    return value
  }, 'Custom Bitcoin address validation')
