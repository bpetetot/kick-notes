import React from 'react'

import { useAuth } from '../auth'
import { useNetwork } from '../helpers/network'
import Notes, { NotesProvider } from '../notes'

import styles from './home.module.css'

const Home = () => {
  const { user, isAuthenticated, login, logout } = useAuth()
  const { isOnline } = useNetwork()

  return (
    <div className={styles.home}>
      <header>
        <h1>Kick notes</h1>
        <h3>{isOnline ? 'Online' : 'Offline'}</h3>
        {!isAuthenticated && <button onClick={login}>Login with github</button>}
        {isAuthenticated && <button onClick={logout}>Logout</button>}
      </header>

      {isAuthenticated && (
        <NotesProvider user={user} isOnline={isOnline}>
          <h2>{user.displayName}</h2>
          <p>
            <code>{JSON.stringify(user, null, 2)}</code>
          </p>
          <Notes />
        </NotesProvider>
      )}
    </div>
  )
}

export default Home
