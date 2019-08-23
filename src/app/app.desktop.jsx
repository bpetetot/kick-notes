import React from 'react'
import { Route } from 'react-router-dom'

import { useFullscreen } from 'services/fullscreen'
import Note from './Note'
import Notebook from './Notebook'
import Settings from './Settings'
import Explorer from './Explorer'

import styles from './app.module.css'

const AppDesktop = () => {
  const { fullscreen } = useFullscreen()

  return (
    <>
      {!fullscreen && <Explorer className={styles.sidebar} />}
      <div className={styles.content}>
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/note" component={Note} />
        <Route exact path={['/', '/notebook']} component={Notebook} />
      </div>
    </>
  )
}

export default AppDesktop
