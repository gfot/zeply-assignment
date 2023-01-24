'use strict'

const math = require('../../lib/modules/math.module')

describe('math.module', () => {
  describe('::toBitcoin()', () => {
    it('converts an amount in SATS to BTC', () => {
      expect(math.toBitcoin(1)).toEqual(1e-8)
    })

    it('converts as expected if input is a number in string format', () => {
      expect(math.toBitcoin('1250')).toEqual(0.0000125)
    })

    it('throws an error if input is not a valid number', () => {
      expect(() => {
        math.toBitcoin('a')
      }).toThrow(
        'toBitcoin must be called on a whole number or string format whole number'
      )
    })

    it('throws an error if input value is not an integer', () => {
      expect(() => {
        math.toBitcoin('1.235')
      }).toThrow(
        'toBitcoin must be called on a whole number or string format whole number'
      )
    })
  })

  describe('::toSatoshi()', () => {
    it('converts an amount in BTC to SATS', () => {
      expect(math.toSatoshi(1e-8)).toEqual(1)
    })

    it('converts as expected if input is a number in string format', () => {
      expect(math.toSatoshi('0.0000125')).toEqual(1250)
    })

    it('throws an error if input is not a valid number', () => {
      expect(() => {
        math.toSatoshi('a')
      }).toThrow('toSatoshi must be called on a number or string, got NaN')
    })
  })

  describe('::multiply()', () => {
    it('multiplies two numbers and returns result by default in 2 decimal places', () => {
      expect(math.multiply('1.111', '2')).toEqual(2.22)
    })

    it('accepts option to set number of decimal places', () => {
      expect(math.multiply('1.111', '2', 3)).toEqual(2.222)
    })
  })

  describe('::divide()', () => {
    it('divides two numbers and returns result by default in 2 decimal places', () => {
      expect(math.divide('1.111', '2')).toEqual(0.56)
    })

    it('accepts option to set number of decimal places', () => {
      expect(math.divide('1.111', '2', 3)).toEqual(0.556)
    })
  })
})
