import { useCallback, useState } from 'react'

export const useSubscriptionsMap = (initialValue = new Map()) => {
  const [subscriptionsMap, setSubscriptionsMap] = useState(initialValue)

  const updateMap = useCallback(
    (k: string, v: boolean) => {
      if (subscriptionsMap.has(k)) {
        subscriptionsMap.delete(k)
        setSubscriptionsMap(new Map(subscriptionsMap))
      } else {
        setSubscriptionsMap(new Map(subscriptionsMap.set(k, v)))
      }
    },
    [subscriptionsMap]
  )

  return { subscriptionsMap, updateMap }
}
