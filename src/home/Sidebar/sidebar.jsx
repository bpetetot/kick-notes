import React from 'react'
import cn from 'classnames'

import NotesExplorer from '../../notebook/NotesExplorer'
import Logout from '../../auth/Logout'

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
