import React, { useEffect, useContext } from 'react'

import { fetchRepo } from '../git'

const SyncContext = React.createContext()

export const useSync = () => useContext(SyncContext)

export const SyncProvider = ({ children, user, isOnline }) => {
  useEffect(() => {
    if (!user) return
    const load = async () => {
      if (isOnline) {
        await fetchRepo(user, console.log)
      }
    }
    load()
  }, [user, isOnline]) // eslint-disable-line

  return <SyncContext.Provider value={{}}>{children}</SyncContext.Provider>
}
