import { useCallback } from 'react'

import {
  Label,
  ListItem,
  ResultList,
  ResultWrapper,
  Title,
  Value,
} from '../Shared'

import type { AddressCardProps } from './types'

export const AddressCard = ({
  info,
  setError,
  subscriptionsMap,
  subscribe,
  unsubscribe,
  setLiveData,
}: AddressCardProps) => {
  const { currency, type, id } = info

  const handleUnsubscribeClick = useCallback(() => {
    unsubscribe(`/ws/liveData/${id}`).catch((error: Error) => setError(error))
  }, [id, setError, unsubscribe])

  const handleSubscribeClick = useCallback(() => {
    subscribe(`/ws/liveData/${id}`, (message: any) => {
      setLiveData(message)
    }).catch((error: Error) => setError(error))
  }, [id, setError, setLiveData, subscribe])

  const isSubscribed = subscriptionsMap.get(`/ws/liveData/${info.id}`)

  const handleClick = isSubscribed
    ? handleUnsubscribeClick
    : handleSubscribeClick

  const label = isSubscribed ? 'Unsubscribe' : 'Subscribe'

  return (
    <ResultWrapper>
      <Title>
        {type}{' '}
        <span
          style={{
            textAlign: 'right',
            textDecoration: 'underline',
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
          onClick={handleClick}
          title={isSubscribed ? 'Unsubscribe' : 'Subscribe'}
        >
          {label}
        </span>
      </Title>
      <hr />
      <ResultList style={{ marginTop: '8px' }}>
        <ListItem>
          <Label>Number of confirmed transactions:</Label>{' '}
          <Value>{info.total_confirmed_transactions}</Value>
        </ListItem>
        <ListItem>
          <Label>Total {currency} received:</Label>{' '}
          <Value>{info.total_received[currency]}</Value>
        </ListItem>
        <ListItem>
          <Label>Total {currency} spent:</Label>{' '}
          <Value>{info.total_spent[currency]}</Value>
        </ListItem>
        <ListItem>
          <Label>Total {currency} unspent:</Label>{' '}
          <Value>{info.total_unspent[currency]}</Value>
        </ListItem>
        <ListItem>
          <Label>Current address balance (in {currency}):</Label>{' '}
          <Value>{info.current_balance[currency]}</Value>
        </ListItem>
      </ResultList>
    </ResultWrapper>
  )
}
