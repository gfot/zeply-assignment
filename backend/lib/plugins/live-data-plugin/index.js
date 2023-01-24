'use strict'

const Nes = require('@hapi/nes')
const ws = require('ws')

module.exports = {
  name: 'liveDataPlugin',
  version: '1.0.0',
  register: async function (server, options) {
    await server.register(Nes)

    server.subscription('/ws/liveData/{address}', {
      onSubscribe: async (socket, path, params) => {
        const { address } = params
        // Connect to blockchain.info websockets API
        const webSocket = new ws('wss://ws.blockchain.info/inv')
        socket.app.webSocket = webSocket
        webSocket.on('open', () => {
          // Subscribe to live data for the specific bitcoin address
          webSocket.send(JSON.stringify({ op: 'addr_sub', addr: address }))
        })
        webSocket.on('message', (data) => {
          // Send the live data to the client through the websocket subscription
          socket.publish(`/ws/liveData/${address}`, JSON.parse(data)) // Maybe process data before sending / persistence?
        })
        webSocket.on('error', (error) => {
          console.error('Websocket error:', error)
          socket.publish(`/ws/liveData/${address}`, { error })
        })
        webSocket.on('close', (event) => {
          console.log('Websocket closed:', event)
          if (event.wasClean === false) {
            // handle unexpected close
            socket.publish(`/ws/liveData/${address}`, { error: event })
          }
        })
      },
      onUnsubscribe: (socket, path) => {
        console.log(`Unsubscribed from ${path}`)
        // Unsubscribe from the specific bitcoin address
        const webSocket = socket.app.webSocket
        webSocket.send(JSON.stringify({ op: 'addr_unsub', addr: address }))
        // Close the websocket connection
        webSocket.close()
      },
    })
  },
}
