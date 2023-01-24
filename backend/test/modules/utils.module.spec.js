'use strict'

const utils = require('../../lib/modules/utils.module')
const transactionIdGenerator = require('../support/generators/transaction-id.generator')

describe('utils.module', () => {
  describe('::isTransactionId()', () => {
    it('given a string with length 64, returns "true"', () => {
      expect(utils.isTransactionId(transactionIdGenerator())).toBeTruthy()
    })

    it('given a string with other length, returns "false', () => {
      expect(utils.isTransactionId(transactionIdGenerator(16))).toBeFalsy()
    })

    it.each([12, [], {}, undefined])(
      'given value is not a string, returns "false" (val: %s)',
      (arg) => {
        expect(utils.isTransactionId(arg)).toBeFalsy()
      }
    )
  })
})
