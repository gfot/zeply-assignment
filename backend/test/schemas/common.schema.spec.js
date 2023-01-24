'use strict'

const commonSchema = require('../../lib/schemas/common.schema')
const transactionIdGenerator = require('../support/generators/transaction-id.generator')

describe('common.schema', () => {
  describe('::transactionId()', () => {
    beforeEach(() => {
      this.schema = commonSchema.transactionId()
    })

    it('accepts a valid transaction ID', () => {
      const { error } = this.schema.validate(transactionIdGenerator())
      expect(error).toBeUndefined()
    })

    it('rejects any ID with length less than 64', () => {
      const { error } = this.schema.validate(transactionIdGenerator(32))
      expect(error).not.toBeUndefined()
      expect(error.message).toMatch(/"value" length must be 64 characters long/)
    })

    it('rejects any ID with length greater than 64', () => {
      const { error } = this.schema.validate(transactionIdGenerator(65))
      expect(error).not.toBeUndefined()
      expect(error.message).toMatch(/"value" length must be 64 characters long/)
    })

    it('rejects any ID with invalid characters', () => {
      const { error } = this.schema.validate('Z'.repeat(64))
      expect(error).not.toBeUndefined()
      expect(error.message).toMatch(
        /"value" must only contain hexadecimal characters/
      )
    })
  })

  describe('::addressId()', () => {
    beforeEach(() => {
      this.schema = commonSchema.addressId()
    })

    it.each([
      '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem',
      '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
      'bc1ptxs597p3fnpd8gwut5p467ulsydae3rp9z75hd99w8k3ljr9g9rqx6ynaw',
      'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3',
    ])('accepts a valid ID (%s)', (id) => {
      const { error } = this.schema.validate(id)
      expect(error).toBeUndefined()
    })

    it.each([
      '17VZNX1SN5NtKa8UFFxwQbFeFc3iqRYhem',
      '17VZNX1SN5NtKa8UFFxwQbFFFc3iqRYhem',
      'bc1qw508d6qejxtdg4y5r3zrrvary0c5xw7kv8f3t4',
    ])('rejects invalid ID (%s)', (id) => {
      const { error } = this.schema.validate(id)
      expect(error).not.toBeUndefined()
      expect(error.message).toMatch(/"value" contains an invalid value/)
    })
  })
})
