import React, { useState, useEffect, useContext } from 'react'

import { fetchRepo } from './commands'

const SyncContext = React.createContext()

export const useSync = () => useContext(SyncContext)

export const SyncProvider = ({ children, user, isOnline }) => {
  const [isRepoLoaded, setIsRepoLoaded] = useState(false)

  useEffect(() => {
    if (!user) return
    const load = async () => {
      if (isOnline) {
        await fetchRepo(user, console.log)
      }
      setIsRepoLoaded(true)
    }
    load()
  }, [user, isOnline]) // eslint-disable-line

  return (
    <SyncContext.Provider value={{ isRepoLoaded }}>
      {children}
    </SyncContext.Provider>
  )
}
