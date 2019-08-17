import React from 'react'

import { useAuth } from '../context'
import styles from './logout.module.css'

const Logout = () => {
  const { logout } = useAuth()
  return (
    <button onClick={logout} className={styles.logout}>
      Logout
    </button>
  )
}

export default Logout
