import { Client } from '@hapi/nes/lib/client'
import { useEffect, useState } from 'react'

import config from '../config.json'

const {
  websocketUrl: WS_URL,
  wsMaxRetries: WS_MAX_RETRIES,
  wsReconnectDelayMs: WS_RECONNECT_DELAY_MS,
} = config

export const useWebSocketConnection = () => {
  const [client, setClient] = useState<Client>(new Client(WS_URL))
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!client) {
      const c = new Client(WS_URL)
      setClient(c)
    }

    if (client) {
      client.onConnect = () => {
        setIsConnected(true)
        console.log('Websocket connected')
      }

      client.onDisconnect = () => {
        setIsConnected(false)
        console.log('Websocket disconnected')
      }

      client.connect({
        maxDelay: WS_RECONNECT_DELAY_MS,
        retries: WS_MAX_RETRIES,
      })
    }
  }, [client])

  return { client, isConnected }
}
