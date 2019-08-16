import React from 'react'

import AlertIcon from 'react-feather/dist/icons/alert-circle'
import { useNetwork } from '../../helpers/network'

import styles from './offline.module.css'

const OfflineIndicator = () => {
  const { isOnline } = useNetwork()

  if (isOnline) return null

  return (
    <div className={styles.offline}>
      <AlertIcon size={16} />
      <span>offline</span>
    </div>
  )
}

export default OfflineIndicator
