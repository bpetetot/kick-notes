import React from 'react'

import { useAuth } from 'services/auth'
import { deleteFSDatabase } from 'services/fs'
import styles from './logout.module.css'

const Logout = () => {
  const { logout } = useAuth()

  const handleLogout = () => {
    deleteFSDatabase()
    logout()
  }

  return (
    <button onClick={handleLogout} className={styles.logout}>
      Logout
    </button>
  )
}

export default Logout
