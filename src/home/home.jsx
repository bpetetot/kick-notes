import React from 'react'
import cn from 'classnames'

import { useAuth } from '../auth'
import { useNetwork } from '../helpers/network'
import { SyncProvider } from '../git'
import { NotebookProvider } from '../notebook'
import { NoteProvider, Note } from '../note'
import { useSider } from '../components/Sider'
import Sidebar from './Sidebar'

import styles from './home.module.css'

const Home = () => {
  const { user } = useAuth()
  const { isOnline } = useNetwork()
  const { isOpen } = useSider()

  return (
    <SyncProvider user={user} isOnline={isOnline}>
      <NotebookProvider>
        <NoteProvider>
          <div className={styles.layout}>
            <Sidebar
              className={cn(styles.sidebar, { [styles.open]: isOpen })}
            />
            <div className={cn(styles.content, { [styles.open]: !isOpen })}>
              <Note />
            </div>
          </div>
        </NoteProvider>
      </NotebookProvider>
    </SyncProvider>
  )
}

export default Home
