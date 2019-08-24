import React from 'react'
import KickNotesIcon from 'react-feather/dist/icons/layers'

import styles from './loading.module.css'
import { useAuth } from 'services/auth'
import { useGit } from 'services/git'

const Loading = ({ children }) => {
  const { loading } = useAuth()
  const { isRepoLoaded } = useGit()

  const appLoaded = !loading && isRepoLoaded

  if (appLoaded) {
    return children
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <KickNotesIcon size={64} />
        <h1>Kick Notes</h1>
      </div>
    </div>
  )
}

export default Loading
