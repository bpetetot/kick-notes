import React from 'react'
import { Route } from 'react-router-dom'

import Note from './Note'
import Notebook from './Notebook'
import Settings from './Settings'
import Explorer from './Explorer'

import styles from './app.module.css'

const AppMobile = () => {
  return (
    <div className={styles.content}>
      <Route exact path="/notebook" component={Notebook} />
      <Route exact path="/note" component={Note} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path={['/', '/explore']} component={Explorer} />
    </div>
  )
}

export default AppMobile
