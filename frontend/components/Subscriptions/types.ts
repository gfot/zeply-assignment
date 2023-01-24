import { ReactNode } from 'react'

export type SubscriptionsProps = {
  children?: ReactNode
  subscriptionsMap: Map<string, boolean>
  liveData: Map<string, Array<any>>
}
