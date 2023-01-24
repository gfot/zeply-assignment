import { Client } from '@hapi/nes/lib/client'
import { useCallback, useState } from 'react'

export const useWebSocket = (
  client: Client,
  subscriptionsMap: Map<string, boolean>,
  updateMap: any
) => {
  const [liveData, setLiveData] = useState(new Map<string, Array<any>>())

  const updateLiveData = useCallback(
    (k: string, v: any) => {
      if (liveData.has(k)) {
        liveData.get(k)?.push(v)
        setLiveData(new Map(liveData))
      } else {
        setLiveData(new Map(liveData.set(k, [v])))
      }
    },
    [liveData]
  )

  const subscribe = useCallback(
    (path: string) => {
      if (!client) {
        return Promise.reject(new Error('Client is not connected'))
      }

      if (subscriptionsMap.get(path)) {
        return Promise.reject(new Error(`Already subscribed to path: ${path}`))
      }

      updateMap(path, true)

      return client
        .subscribe(path, (message) => {
          console.log(message)
          updateLiveData(path, message)
        })
        .catch((err) => {
          console.error(err)
          return Promise.reject(new Error(`Error subscribing to path: ${path}`))
        })
    },
    [client, subscriptionsMap, updateLiveData, updateMap]
  )

  const unsubscribe = useCallback(
    (path: string) => {
      if (!client) {
        return Promise.reject(new Error('Client is not connected'))
      }

      if (!subscriptionsMap.get(path)) {
        return Promise.reject(new Error(`Not subscribed to path: ${path}`))
      }

      updateMap(path)

      return client.unsubscribe(path).catch((err) => {
        console.error(err)
        return Promise.reject(
          new Error(`Error unsubscribing from path: ${path}`)
        )
      })
    },
    [client, subscriptionsMap, updateMap]
  )

  return { subscribe, unsubscribe, liveData, setLiveData }
}
