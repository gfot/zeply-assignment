'use strict'

const { init } = require('../../lib/api')

describe('GET /healthcheck', () => {
  beforeAll(async () => {
    this.server = await init()
  })

  beforeEach(() => {
    this.request = {
      method: 'GET',
      url: '/healthcheck',
    }
  })

  it('responds with 200 "OK"', async () => {
    const response = await this.server.inject(this.request)
    expect(response.statusCode).toBe(200)
  })
})
