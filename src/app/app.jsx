import React from 'react'
import { Route } from 'react-router-dom'

import { useDeviceDetect } from 'services/device'
import { useSider } from 'components/Sider'

import Note from './Note'
import Notebook from './Notebook'
import Settings from './Settings'
import Explorer from './Explorer'

import styles from './app.module.css'

const App = () => {
  const { isOpen } = useSider()
  const { isMobile } = useDeviceDetect()

  return (
    <>
      {isOpen && <Explorer className={styles.sidebar} />}
      {((!isOpen && isMobile) || !isMobile) && (
        <div className={styles.content}>
          <Route exact path="/note" component={Note} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/" component={Notebook} />
        </div>
      )}
    </>
  )
}

export default App
