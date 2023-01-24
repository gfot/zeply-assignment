'use strict'

const {
  transformAddress,
  transformTransaction,
} = require('../../lib/transformers/search.transform')
const {
  responsePayload: addressPayload,
} = require('../support/fixtures/address.fixture')
const {
  responsePayload: tickerPayload,
} = require('../support/fixtures/exchange-ticker.fixture')
const {
  responsePayload: latestBlockPayload,
} = require('../support/fixtures/latest-block.fixture')
const {
  responsePayload: transactionPayload,
} = require('../support/fixtures/transaction.fixture')

describe('search.transform', () => {
  describe('::transformAddress()', () => {
    it('converts an address payload to expected form', () => {
      expect(
        transformAddress(addressPayload, 'EUR', tickerPayload)
      ).toStrictEqual({
        id: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
        type: 'address',
        currency: 'EUR',
        total_confirmed_transactions: 54,
        total_received: { SATS: 12363668, EUR: 2439.51 },
        total_spent: { SATS: 14293, EUR: 2.82 },
        total_unspent: { SATS: 12349375, EUR: 2436.69 },
        current_balance: { SATS: 12349375, EUR: 2436.69 },
      })
    })
  })

  describe('::transformTransaction()', () => {
    it('converts a transaction payload to expected form', () => {
      expect(
        transformTransaction(
          transactionPayload,
          latestBlockPayload,
          'BTC',
          tickerPayload
        )
      ).toStrictEqual({
        hash: '7231e3eefa4154600f0a2cf75384d0c02c0f34620850b3c7f48a157fb7198e75',
        type: 'transaction',
        currency: 'BTC',
        received_time: 1663184870,
        status: 'confirmed',
        size_bytes: 2736,
        total_confirmations: 18396,
        total_input: { SATS: 179637726, BTC: 1.79637726 },
        total_output: { SATS: 179633760, BTC: 1.7963376 },
        total_fees: { SATS: 3966, BTC: 0.00003966 },
      })
    })

    it("returns 0 total confirmations if it's unconfirmed", () => {
      expect(
        transformTransaction(
          Object.assign({}, transactionPayload, { block_height: undefined }),
          latestBlockPayload,
          'BTC',
          tickerPayload
        )
      ).toStrictEqual({
        hash: '7231e3eefa4154600f0a2cf75384d0c02c0f34620850b3c7f48a157fb7198e75',
        type: 'transaction',
        currency: 'BTC',
        received_time: 1663184870,
        status: 'unconfirmed',
        size_bytes: 2736,
        total_confirmations: 0,
        total_input: { SATS: 179637726, BTC: 1.79637726 },
        total_output: { SATS: 179633760, BTC: 1.7963376 },
        total_fees: { SATS: 3966, BTC: 0.00003966 },
      })
    })
  })
})
