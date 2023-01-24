'use strict'

const { multiply, toBitcoin } = require('../modules/math.module')

exports.transformAddress = (payload, currency, rates) => {
  return {
    id: payload.address,
    type: 'address',
    currency,
    total_confirmed_transactions: payload.n_tx,
    total_received: {
      SATS: payload.total_received,
      [currency]: calculateAmountInCurrency(
        rates,
        payload.total_received,
        currency
      ),
    },
    total_spent: {
      SATS: payload.total_sent,
      [currency]: calculateAmountInCurrency(
        rates,
        payload.total_sent,
        currency
      ),
    },
    total_unspent: {
      SATS: payload.total_received - payload.total_sent,
      [currency]: calculateAmountInCurrency(
        rates,
        payload.total_received - payload.total_sent,
        currency
      ),
    },
    current_balance: {
      SATS: payload.final_balance,
      [currency]: calculateAmountInCurrency(
        rates,
        payload.final_balance,
        currency
      ),
    },
  }
}

exports.transformTransaction = (payload, latestBlock, currency, rates) => {
  const totalInputSats = totalInput(payload.inputs)
  const totalOutputSats = totalOutput(payload.out)
  const totalConfirmations = payload.block_height
    ? latestBlock.height - payload.block_height + 1
    : 0

  return {
    hash: payload.hash,
    type: 'transaction',
    currency,
    received_time: payload.time,
    status: totalConfirmations ? 'confirmed' : 'unconfirmed',
    size_bytes: payload.size,
    total_confirmations: totalConfirmations,
    total_input: {
      SATS: totalInputSats,
      [currency]: calculateAmountInCurrency(rates, totalInputSats, currency),
    },
    total_output: {
      SATS: totalOutputSats,
      [currency]: calculateAmountInCurrency(rates, totalOutputSats, currency),
    },
    total_fees: {
      SATS: payload.fee,
      [currency]: calculateAmountInCurrency(rates, payload.fee, currency),
    },
  }
}

function calculateAmountInCurrency(rates, sats, currency) {
  const btc = toBitcoin(sats)
  if (currency === 'BTC') {
    return btc
  }
  return multiply(btc, rates[currency].last)
}

function totalInput(inputs) {
  let totalInputSats = 0
  for (const input of inputs) {
    const { prev_out } = input
    totalInputSats += prev_out.value
  }
  return totalInputSats
}

function totalOutput(out) {
  let totalOutputSats = 0
  for (const item of out) {
    totalOutputSats += item.value
  }
  return totalOutputSats
}
