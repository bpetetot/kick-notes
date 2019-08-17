import React from 'react'
import cn from 'classnames'

import Logout from 'services/auth/Logout'

import NotesExplorer from '../NotesExplorer'
import styles from './sidebar.module.css'

const Sidebar = ({ className }) => (
  <div className={cn(styles.sidebar, className)}>
    <NotesExplorer />
    <div className={styles.actions}>
      <Logout />
    </div>
  </div>
)

export default Sidebar
