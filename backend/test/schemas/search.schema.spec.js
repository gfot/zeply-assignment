'use strict'

const { CURRENCIES } = require('../../lib/constants')
const searchSchema = require('../../lib/schemas/search.schema')
const addressIdGenerator = require('../support/generators/address-id.generator')
const transactionIdGenerator = require('../support/generators/transaction-id.generator')

describe('search.schema', () => {
  describe('::params()', () => {
    beforeEach(() => {
      this.schema = searchSchema.params()
    })

    it('accepts valid transaction id', () => {
      const { error } = this.schema.validate({ id: transactionIdGenerator() })
      expect(error).toBeUndefined()
    })

    it('accepts valid address id', () => {
      const { error } = this.schema.validate({ id: addressIdGenerator() })
      expect(error).toBeUndefined()
    })

    it('rejects, given search is not specified', () => {
      const { error } = this.schema.validate({ id: undefined })
      expect(error).not.toBeUndefined()
      expect(error.message).toMatch(/"id" is required/)
    })

    it('rejects, given search term has length less than 26', () => {
      const { error } = this.schema.validate({ id: 'small' })
      expect(error).not.toBeUndefined()
      expect(error.message).toMatch(
        /"id" length must be at least 26 characters long/
      )
    })

    it('rejects, given search term has length greater than 64', () => {
      const { error } = this.schema.validate({
        id: 'bigbadaboom'.repeat(6),
      })
      expect(error).not.toBeUndefined()
      expect(error.message).toMatch(
        /"id" length must be less than or equal to 64 characters long/
      )
    })

    it.each([1, ['hi'], { invalid: true }, true, null])(
      'rejects, given search term is not a string (value: %s)',
      (arg) => {
        const { error } = this.schema.validate({
          id: arg,
        })
        expect(error).not.toBeUndefined()
        expect(error.message).toMatch(/"id" must be a string/)
      }
    )
  })

  describe('::query()', () => {
    beforeEach(() => {
      this.schema = searchSchema.query()
    })

    it('accepts default, given currency query is not specified', () => {
      const { error } = this.schema.validate({ currency: undefined })
      expect(error).toBeUndefined()
    })

    it.each([...CURRENCIES])(
      'accepts, given currency is a valid string (value: %s)',
      (arg) => {
        const { error } = this.schema.validate({ currency: arg })
        expect(error).toBeUndefined()
      }
    )

    it.each([1, '', '123', { invalid: true }, [], true, null])(
      'rejects, given currency is not a valid string (value: %s)',
      (arg) => {
        const { error } = this.schema.validate({
          currency: arg,
        })
        expect(error).not.toBeUndefined()
        expect(error.message).toMatch(
          /"currency" must be one of \[BTC, EUR, USD\]/
        )
      }
    )
  })
})
