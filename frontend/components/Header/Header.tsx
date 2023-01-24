import styled from 'styled-components'

import { SUPPORTED_CURRENCIES } from '../../constants'

import type { HeaderProps } from './types'

export const Header = ({
  term,
  onTextFieldChange,
  onTextFieldKeyUp,
  onCurrencySelectorChange,
}: HeaderProps) => {
  return (
    <>
      <Label>Please enter an address or transaction ID</Label>
      <TextField
        type="text"
        value={term}
        placeholder="bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq"
        onChange={onTextFieldChange}
        onKeyUp={onTextFieldKeyUp}
      />
      <CurrencySelector onChange={onCurrencySelectorChange}>
        {SUPPORTED_CURRENCIES.map((currency: string) => (
          <option key={currency}>{currency}</option>
        ))}
      </CurrencySelector>
    </>
  )
}

const Label = styled.label`
  display: block;
  margin-bottom: 2px;
  font-size: 1.4rem;
  font-weight: 500;
`

const TextField = styled.input`
  width: 70%;
  padding: 2px;
  font-size: 1.3rem;
`

const CurrencySelector = styled.select`
  margin-left: 8px;
  border: 2px solid hsl(200deg 100% 40%);
  font-size: 1.1rem;
  padding: 5px;

  &:hover {
    background-color: hsl(0deg 0% 90%);
  }
`
