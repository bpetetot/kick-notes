import React from 'react'
import AlertIcon from 'react-feather/dist/icons/alert-circle'

import { useNetwork } from 'services/network'

import IconLabel from '../IconLabel'
import styles from './offline.module.css'

const OfflineIndicator = () => {
  const { isOnline } = useNetwork()

  if (isOnline) return null

  return (
    <IconLabel icon={AlertIcon} size={16} className={styles.offline}>
      offline
    </IconLabel>
  )
}

export default OfflineIndicator
