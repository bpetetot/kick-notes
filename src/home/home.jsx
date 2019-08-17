import React from 'react'
import cn from 'classnames'
import { Route } from 'react-router-dom'

import { useAuth } from '../auth'
import { useNetwork } from '../helpers/network'
import { SyncProvider } from '../git'
import { useSider } from '../components/Sider'
import NotebookProvider from '../notebook/context'
import Note from '../notebook/Note'
import AddNote from '../notebook/Add'
import Sidebar from './Sidebar'

import styles from './home.module.css'

const Home = () => {
  const { user } = useAuth()
  const { isOnline } = useNetwork()
  const { isOpen } = useSider()

  return (
    <SyncProvider user={user} isOnline={isOnline}>
      <NotebookProvider>
        <div className={styles.layout}>
          <Sidebar className={cn(styles.sidebar, { [styles.open]: isOpen })} />
          <div className={cn(styles.content, { [styles.open]: !isOpen })}>
            <Route exact path="/note" component={Note} />
            <Route exact path="/" component={AddNote} />
          </div>
        </div>
      </NotebookProvider>
    </SyncProvider>
  )
}

export default Home
