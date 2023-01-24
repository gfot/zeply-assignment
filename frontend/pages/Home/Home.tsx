import { SetStateAction, useCallback, useState } from 'react'
import styled from 'styled-components'

import { AddressCard } from '~/components/AddressCard'
import { Header } from '~/components/Header'
import { Subscriptions } from '~/components/Subscriptions'
import { TransactionCard } from '~/components/TransactionCard'

import { useSearch } from '~/hooks/useSearch'
import { useSubscriptionsMap } from '~/hooks/useSubscriptionsMap'
import { useWebSocket } from '~/hooks/useWebSocket'
import { useWebSocketConnection } from '~/hooks/useWebSocketConnection'

export const Home = () => {
  const [error, setError] = useState<Error | null>(null)
  const { subscriptionsMap, updateMap } = useSubscriptionsMap()
  const { client } = useWebSocketConnection()
  const { subscribe, unsubscribe, liveData, setLiveData } = useWebSocket(
    client,
    subscriptionsMap,
    updateMap
  )
  const { term, setTerm, search, setCurrency, loading, searchError, data } =
    useSearch()

  const handleTextFieldChange = useCallback(
    (event: { target: { value: SetStateAction<string> } }) => {
      setTerm(event.target.value)
    },
    [setTerm]
  )

  const handleTextFieldKeyUp = useCallback(
    (event: { key: string }) => {
      if (event.key === 'Enter') {
        search()
      }
    },
    [search]
  )

  const handleCurrencyChange = useCallback(
    (event: { target: { value: SetStateAction<string> } }) => {
      setCurrency(event.target.value)
    },
    [setCurrency]
  )

  return (
    <Wrapper>
      <Header
        term={term}
        onTextFieldChange={handleTextFieldChange}
        onTextFieldKeyUp={handleTextFieldKeyUp}
        onCurrencySelectorChange={handleCurrencyChange}
      />
      {loading && <Loading>Loading...</Loading>}
      {error && <Error>{error.message}</Error>}
      {searchError && <Error>{searchError.message}</Error>}
      {subscriptionsMap.size > 0 && (
        <Subscriptions
          subscriptionsMap={subscriptionsMap}
          liveData={liveData}
        />
      )}
      {data &&
        !loading &&
        !error &&
        (data.type === 'address' ? (
          <AddressCard
            info={data}
            setError={setError}
            subscriptionsMap={subscriptionsMap}
            subscribe={subscribe}
            unsubscribe={unsubscribe}
            setLiveData={setLiveData}
          />
        ) : (
          <TransactionCard info={data} />
        ))}
    </Wrapper>
  )
}

const Loading = styled.div`
  max-width: 700px;
  margin: 32px auto;
  border-radius: 8px;
  padding: 16px;
  background-color: hsl(50deg 100% 40% / 0.3);
  border: none;
  text-align: center;
  font-size: 1.5rem;
`

const Error = styled.div`
  max-width: 700px;
  margin: 32px auto;
  border-radius: 8px;
  padding: 16px;
  background-color: hsl(0deg 100% 40% / 0.3);
  border: none;
  text-align: center;
  font-size: 1.5rem;
`

const Wrapper = styled.div`
  max-width: 700px;
  margin: 32px auto;
  border-radius: 8px;
  padding: 16px;
  background-color: hsl(200deg 100% 40% / 0.3);
  border: none;
`
