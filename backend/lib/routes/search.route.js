'use strict'

const searchHandler = require('../handlers/search.handler')
const searchSchema = require('../schemas/search.schema')

module.exports = {
  method: 'GET',
  path: '/search/{id}',
  handler: searchHandler.get,
  options: {
    description: 'Return address/transaction data by search term and currency',
    validate: {
      params: searchSchema.params(),
      query: searchSchema.query(),
    },
  },
}
