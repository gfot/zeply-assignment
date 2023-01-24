import { ReactNode } from 'react'

export type HeaderProps = {
  children?: ReactNode
  term: string
  onTextFieldChange: any
  onTextFieldKeyUp: any
  onCurrencySelectorChange: any
}
