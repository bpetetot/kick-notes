import React, { useState, useEffect, useContext } from 'react'

import { useStorage } from 'services/storage'

import { cloneOrPull, pull, commit, push } from './service'

const PULL_DELAY = 60000

const GitContext = React.createContext()

export const useGit = () => useContext(GitContext)

export const GitProvider = ({ children, user, isOnline }) => {
  const [isRepoLoaded, setIsRepoLoaded] = useState(false)
  const [isSync, setIsSync] = useStorage('isSync')

  useEffect(() => {
    if (!user) return

    const load = async () => {
      if (!isRepoLoaded && isOnline) {
        // clone or pull the repo
        await cloneOrPull(user)

        // Push to the repo if needed
        if (/false/i.test(isSync) && isOnline) {
          console.log('Need to be synchronized.')
          setIsSync(true)
          push(user, true)
        } else {
          console.log('Already synchronized.')
        }
      }
      setIsRepoLoaded(true)
    }
    load()

    const pullInterval = setInterval(() => {
      if (isOnline) pull(user)
    }, PULL_DELAY)

    return () => clearInterval(pullInterval)
  }, [user, isOnline, isSync, isRepoLoaded]) // eslint-disable-line

  const commitAndPush = async messsage => {
    await commit(messsage)
    if (isOnline) {
      await push(user)
    } else {
      console.log('not sync')
      setIsSync(false)
    }
  }

  return (
    <GitContext.Provider value={{ isRepoLoaded, commitAndPush }}>
      {children}
    </GitContext.Provider>
  )
}
