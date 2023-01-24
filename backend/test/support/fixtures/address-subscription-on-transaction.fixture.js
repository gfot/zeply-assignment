'use strict'

exports.responsePayload = {
  op: 'utx',
  x: {
    lock_time: 0,
    ver: 1,
    size: 192,
    inputs: [
      {
        sequence: 4294967295,
        prev_out: {
          spent: true,
          tx_index: 99005468,
          type: 0,
          addr: '1BwGf3z7n2fHk6NoVJNkV32qwyAYsMhkWf',
          value: 65574000,
          n: 0,
          script: '76a91477f4c9ee75e449a74c21a4decfb50519cbc245b388ac',
        },
        script:
          '483045022100e4ff962c292705f051c2c2fc519fa775a4d8955bce1a3e29884b2785277999ed02200b537ebd22a9f25fbbbcc9113c69c1389400703ef2017d80959ef0f1d685756c012102618e08e0c8fd4c5fe539184a30fe35a2f5fccf7ad62054cad29360d871f8187d',
      },
    ],
    time: 1440086763,
    tx_index: 99006637,
    vin_sz: 1,
    hash: '0857b9de1884eec314ecf67c040a2657b8e083e1f95e31d0b5ba3d328841fc7f',
    vout_sz: 1,
    relayed_by: '127.0.0.1',
    out: [
      {
        spent: false,
        tx_index: 99006637,
        type: 0,
        addr: '1A828tTnkVFJfSvLCqF42ohZ51ksS3jJgX',
        value: 65564000,
        n: 0,
        script: '76a914640cfdf7b79d94d1c980133e3587bd6053f091f388ac',
      },
    ],
  },
}
