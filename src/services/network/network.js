import React, { useState, useEffect, useContext } from 'react'

export const NetworkContext = React.createContext()

export const useNetwork = () => useContext(NetworkContext)

export const NetworkProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    window.addEventListener('online', () => setIsOnline(true))
    window.addEventListener('offline', () => setIsOnline(false))
  }, [])

  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  )
}
