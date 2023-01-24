import { ReactNode } from 'react'

export type AddressCardProps = {
  children?: ReactNode
  info: any
  setError: any
  subscriptionsMap: Map<string, boolean>
  subscribe: any
  unsubscribe: any
  setLiveData: any
}
