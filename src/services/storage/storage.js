import { useState, useEffect } from 'react'

export const useStorage = key => {
  const [value, setValue] = useState(localStorage.getItem(key))

  useEffect(() => {
    if (value === null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, value)
    }
  }, [key, value])

  return [value, setValue]
}
