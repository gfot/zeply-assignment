'use strict'

const nock = require('nock')

const explorer = require('../../lib/adapters/explorer.adapter')
const {
  requestPayload: addressRequestPayload,
  responsePayload: addressFixture,
} = require('../support/fixtures/address.fixture')
const {
  responsePayload: latestBlockFixture,
} = require('../support/fixtures/latest-block.fixture')
const {
  requestPayload: transactionRequestPayload,
  responsePayload: transactionFixture,
} = require('../support/fixtures/transaction.fixture')

describe('explorer.adapter', () => {
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

  describe('::address()', () => {
    beforeEach(() => {
      nock('https://blockchain.info')
        .get(/address/)
        .reply(200, addressFixture)
    })

    it('returns expected exchange data structure', async () => {
      const { id } = addressRequestPayload
      const data = await explorer.address(id)
      expect(data).toStrictEqual(addressFixture)
    })
  })

  describe('::transaction()', () => {
    beforeEach(() => {
      nock('https://blockchain.info')
        .get(/rawtx/)
        .reply(200, transactionFixture)
    })

    it('returns expected exchange data structure', async () => {
      const { id } = transactionRequestPayload
      const data = await explorer.transaction(id)
      expect(data).toStrictEqual(transactionFixture)
    })
  })

  describe('::latestBlock()', () => {
    beforeEach(() => {
      nock('https://blockchain.info')
        .get(/latestblock/)
        .reply(200, latestBlockFixture)
    })

    it('returns expected exchange data structure', async () => {
      const data = await explorer.latestBlock()
      expect(data).toStrictEqual(latestBlockFixture)
    })
  })
})
