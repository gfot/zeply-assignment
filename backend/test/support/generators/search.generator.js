'use strict'

module.exports = function (opts = {}) {
  return Object.assign(
    {
      search: '1'.repeat(48),
    },
    opts
  )
}
