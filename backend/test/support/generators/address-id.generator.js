'use strict'

const BitcoinAddressGenerator = require('bitcoin-address-generator')

module.exports = function (override) {
  return (
    override ||
    BitcoinAddressGenerator.createPublicAddress(
      BitcoinAddressGenerator.generatePublicKeyHash(
        BitcoinAddressGenerator.createPrivateKey()
      )
    )
  )
}
