import {
  Label,
  ListItem,
  ResultList,
  ResultWrapper,
  Title,
  Value,
} from '../Shared'

import type { TransactionCardProps } from './types'

export const TransactionCard = ({ info }: TransactionCardProps) => {
  const { currency, type } = info
  return (
    <ResultWrapper>
      <Title>{type}</Title>
      <hr />
      <ResultList style={{ marginTop: '8px' }}>
        <ListItem>
          <Label>Transaction hash:</Label> <Value>{info.hash}</Value>
        </ListItem>
        <ListItem>
          <Label>Received time:</Label> <Value>{info.received_time}</Value>
        </ListItem>
        <ListItem>
          <Label>Status:</Label> <Value>{info.status}</Value>
        </ListItem>
        <ListItem>
          <Label>Size (in bytes):</Label> <Value>{info.size_bytes}</Value>
        </ListItem>
        <ListItem>
          <Label>Number of confirmations:</Label>{' '}
          <Value>{info.total_confirmations}</Value>
        </ListItem>
        <ListItem>
          <Label>Total {currency} input:</Label>{' '}
          <Value>{info.total_input[currency]}</Value>
        </ListItem>
        <ListItem>
          <Label>Total {currency} output:</Label>{' '}
          <Value>{info.total_output[currency]}</Value>
        </ListItem>
        <ListItem>
          <Label>Total {currency} fees:</Label>{' '}
          <Value>{info.total_fees[currency]}</Value>
        </ListItem>
      </ResultList>
    </ResultWrapper>
  )
}
