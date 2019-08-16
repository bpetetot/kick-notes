import React from 'react'
import cn from 'classnames'

import { useAuth } from '../../auth'
import { NotesList } from '../../notebook'

import styles from './sidebar.module.css'

const Sidebar = ({ className }) => {
  const { logout } = useAuth()

  return (
    <div className={cn(styles.sidebar, className)}>
      <NotesList />
      <div>
        <button className="link" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
