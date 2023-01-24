'use strict'

const nock = require('nock')

const exchange = require('../../lib/adapters/exchange.adapter')
const {
  responsePayload: tickerFixture,
} = require('../support/fixtures/exchange-ticker.fixture')

describe('exchange.adapter', () => {
  beforeAll(() => {
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

  describe('::getTicker()', () => {
    beforeEach(() => {
      nock('https://blockchain.info')
        .get(/ticker/)
        .reply(200, tickerFixture)
    })

    it('returns expected exchange data structure', async () => {
      const data = await exchange.getTicker()
      expect(data).toStrictEqual(tickerFixture)
    })
  })
})
