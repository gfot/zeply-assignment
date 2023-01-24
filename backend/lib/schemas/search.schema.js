'use strict'

const joi = require('joi')

const {
  BTC_ADDRESS_MIN_LENGTH,
  BTC_TRANSACTION_LENGTH,
  CURRENCIES,
} = require('../constants')

exports.params = () =>
  joi.object({
    id: joi
      .string()
      .min(BTC_ADDRESS_MIN_LENGTH)
      .max(BTC_TRANSACTION_LENGTH)
      .required(),
  })

exports.query = () =>
  joi.object({
    currency: joi
      .string()
      .valid(...CURRENCIES)
      .default(CURRENCIES[0]),
  })
