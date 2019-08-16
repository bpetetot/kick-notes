import React from 'react'

import { useAuth } from '../auth'
import { useNetwork } from '../helpers/network'
import { SyncProvider, getRepoFolder } from '../git'
import { NotebookProvider, NoteProvider, Notes, Note } from '../notes'

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
        <SyncProvider user={user} isOnline={isOnline}>
          <NotebookProvider
            defaultNotebook={{
              path: getRepoFolder(user),
              level: 0,
              isDirectory: true,
            }}
          >
            <NoteProvider>
              <h2>{user.displayName}</h2>
              <p>
                <code>{JSON.stringify(user, null, 2)}</code>
              </p>
              <Notes />
              <Note />
            </NoteProvider>
          </NotebookProvider>
        </SyncProvider>
      )}
    </div>
  )
}

export default Home
