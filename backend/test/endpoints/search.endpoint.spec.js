'use strict'

const nock = require('nock')

const { init } = require('../../lib/api')
const {
  requestPayload: addressRequestPayload,
  responsePayload: addressFixture,
} = require('../support/fixtures/address.fixture')
const {
  responsePayload: tickerFixture,
} = require('../support/fixtures/exchange-ticker.fixture')
const {
  responsePayload: latestBlockFixture,
} = require('../support/fixtures/latest-block.fixture')
const {
  requestPayload: transactionRequestPayload,
  responsePayload: transactionFixture,
} = require('../support/fixtures/transaction.fixture')

describe('GET /search/{id}?currency', () => {
  beforeAll(async () => {
    this.server = await init()
    nock.disableNetConnect()
  })

  afterAll(() => {
    nock.enableNetConnect()
  })

  beforeEach(() => {
    if (!nock.isActive()) {
      // needed due to nock.restore()
      nock.activate()
    }
  })

  afterEach(() => {
    nock.cleanAll()
    nock.restore() // avoid memory leak in Jest
  })

  describe('when search term is an address', () => {
    beforeEach(() => {
      this.request = {
        method: 'GET',
        url: `/search/${addressRequestPayload.id}?currency=${addressRequestPayload.currency}`,
      }

      nock('https://blockchain.info')
        .get(/address/)
        .reply(200, addressFixture)
        .get(/ticker/)
        .reply(200, tickerFixture)
    })

    it('responds with 200 "OK"', async () => {
      const response = await this.server.inject(this.request)
      expect(response.statusCode).toBe(200)
    })

    it('responds with payload with expected structure', async () => {
      const response = await this.server.inject(this.request)
      expect(response.result).toStrictEqual({
        id: addressRequestPayload.id,
        type: 'address',
        currency: 'BTC',
        total_confirmed_transactions: expect.any(Number),
        total_received: {
          BTC: expect.any(Number),
          SATS: expect.any(Number),
        },
        total_spent: {
          BTC: expect.any(Number),
          SATS: expect.any(Number),
        },
        total_unspent: {
          BTC: expect.any(Number),
          SATS: expect.any(Number),
        },
        current_balance: {
          BTC: expect.any(Number),
          SATS: expect.any(Number),
        },
      })
    })
  })

  describe('when search term is a transaction', () => {
    beforeEach(() => {
      this.request = {
        method: 'GET',
        url: `/search/${transactionRequestPayload.id}?currency=${transactionRequestPayload.currency}`,
      }

      if (!nock.isActive()) {
        nock.activate()
      }

      nock('https://blockchain.info')
        .get(/rawtx/)
        .reply(200, transactionFixture)
        .get(/ticker/)
        .reply(200, tickerFixture)
        .get(/latestblock/)
        .reply(200, latestBlockFixture)
    })

    it('responds with 200 "OK"', async () => {
      const response = await this.server.inject(this.request)
      expect(response.statusCode).toBe(200)
    })

    it('responds with payload with expected structure', async () => {
      const response = await this.server.inject(this.request)
      expect(response.result).toStrictEqual({
        hash: transactionRequestPayload.id,
        type: 'transaction',
        currency: 'USD',
        received_time: expect.any(Number),
        size_bytes: expect.any(Number),
        total_confirmations: expect.any(Number),
        status: 'confirmed',
        total_output: {
          SATS: expect.any(Number),
          USD: expect.any(Number),
        },
        total_fees: {
          SATS: expect.any(Number),
          USD: expect.any(Number),
        },
        total_input: {
          SATS: expect.any(Number),
          USD: expect.any(Number),
        },
      })
    })
  })

  describe('when request to 3rd-api fails', () => {
    beforeEach(() => {
      this.request = {
        method: 'GET',
        url: `/search/${transactionRequestPayload.id}?currency=${transactionRequestPayload.currency}`,
      }

      if (!nock.isActive()) {
        nock.activate()
      }

      nock('https://blockchain.info').get(/rawtx/).reply(400)
    })

    it('responds with 500 "Internal Server Error"', async () => {
      const response = await this.server.inject(this.request)
      expect(response.statusCode).toBe(500)
    })
  })
})
