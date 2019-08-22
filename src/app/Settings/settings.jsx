import React from 'react'

import Logout from 'components/Logout/logout'

import styles from './settings.module.css'

const Settings = () => {
  return (
    <div className={styles.settings}>
      <Logout />
    </div>
  )
}

export default Settings
