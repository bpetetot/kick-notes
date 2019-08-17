import React from 'react'
import cn from 'classnames'
import { Route } from 'react-router-dom'

import { useAuth } from 'services/auth'
import { useNetwork } from 'services/network'
import { SyncProvider } from 'services/git'
import { NotebookProvider } from 'services/notebook'
import { SettingsProvider } from 'services/settings'
import { useSider } from 'components/Sider'

import Note from './Note'
import AddNote from './Add'
import Sidebar from './Sidebar'

import styles from './app.module.css'

const App = () => {
  const { user } = useAuth()
  const { isOnline } = useNetwork()
  const { isOpen } = useSider()

  return (
    <SyncProvider user={user} isOnline={isOnline}>
      <SettingsProvider>
        <NotebookProvider>
          <Sidebar className={cn(styles.sidebar, { [styles.open]: isOpen })} />
          <div className={cn(styles.content, { [styles.open]: !isOpen })}>
            <Route exact path="/note" component={Note} />
            <Route exact path="/" component={AddNote} />
          </div>
        </NotebookProvider>
      </SettingsProvider>
    </SyncProvider>
  )
}

export default App
