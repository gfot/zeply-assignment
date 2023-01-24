import { useCallback, useEffect, useState } from 'react'

import config from '../config.json'
import { SUPPORTED_CURRENCIES } from '../constants'

import { useDebounce } from '~/hooks/useDebounce'

const { apiUrl: API_URL } = config

class ApiError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export const useSearch = () => {
  const [term, setTerm] = useState('')
  const [currency, setCurrency] = useState<string>(SUPPORTED_CURRENCIES[0])
  const [loading, setLoading] = useState<boolean>(false)
  const [searchError, setSearchError] = useState<Error | null>(null)
  const [data, setData] = useState<any>(null)
  const debounceSearchTerm = useDebounce(term, 200)

  const validateSearchTerm = (input: string) => {
    if (!input) {
      return new Error('Search term is required')
    }
    if (!/^[a-zA-Z0-9]+$/.test(input)) {
      return new Error('Search term can only contain letters and numbers')
    }
  }

  const search = useCallback(async () => {
    const error: any = validateSearchTerm(debounceSearchTerm)
    if (error) {
      setSearchError(error)
      return
    }
    setSearchError(null)
    try {
      setLoading(true)
      const response = await fetch(
        `${API_URL}/search/${debounceSearchTerm}?currency=${currency}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      )
      if (response.status >= 400) {
        const text = await response.text()
        throw new ApiError(text, response.status)
      }
      const data = await response.json()
      setData(data)
    } catch (error: any) {
      switch (error?.statusCode) {
        case 400:
          setSearchError(new Error('Invalid address or transaction ID'))
          break
        default:
          setSearchError(error)
      }
    } finally {
      setLoading(false)
    }
  }, [currency, debounceSearchTerm])

  useEffect(() => {
    if (debounceSearchTerm) {
      search()
    }
  }, [search, debounceSearchTerm, currency])

  return {
    term,
    setTerm,
    search,
    currency,
    setCurrency,
    loading,
    searchError,
    data,
  }
}
