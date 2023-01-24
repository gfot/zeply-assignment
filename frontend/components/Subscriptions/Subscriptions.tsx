import { Bell } from 'react-feather'
import styled from 'styled-components'

import { Card } from '../Shared'

import type { SubscriptionsProps } from './types'

export const Subscriptions = ({
  subscriptionsMap,
  liveData,
}: SubscriptionsProps) => {
  const getLastPathSegment = (val: string, sep = '/') => {
    return val.substring(val.lastIndexOf(sep) + 1)
  }

  return (
    <Wrapper>
      <details>
        <summary>
          You have subscribed to watch {subscriptionsMap.size} address
          {subscriptionsMap.size > 1 ? 'es' : ''}.
        </summary>
        <ul>
          {[...subscriptionsMap.keys()].map((path) => (
            <li key={path}>
              {getLastPathSegment(path)}
              <span>
                <Bell />{' '}
                {liveData?.has(path) ? `${liveData.get(path)?.length}` : ''}
              </span>
            </li>
          ))}
        </ul>
      </details>
    </Wrapper>
  )
}

export const Wrapper = styled(Card)`
  background-color: hsl(150deg 100% 40% / 0.3);
  font-size: 1.2rem;
  p {
    margin-left: 4px;
  }
  ul {
    list-style-type: none;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`
