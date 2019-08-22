import React from 'react'
import OfflineIcon from 'react-feather/dist/icons/cloud-off'

import { useNetwork } from 'services/network'

import styles from './offline.module.css'

const OfflineIndicator = () => {
  const { isOnline } = useNetwork()

  if (isOnline) return null

  return <OfflineIcon size={20} className={styles.offline} />
}

export default OfflineIndicator
