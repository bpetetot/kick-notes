import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import KickNotesIcon from 'react-feather/dist/icons/layers'
import EditIcon from 'react-feather/dist/icons/plus'
import BackIcon from 'react-feather/dist/icons/arrow-left'
import DeleteIcon from 'react-feather/dist/icons/trash'
import SettingsIcon from 'react-feather/dist/icons/settings'

import { useNotebook, deleteNote, deleteNotebook } from 'services/notebook'
import { useRouter } from 'services/router'
import { useDeviceDetect } from 'services/device'
import { useAuth } from 'services/auth'
import { useSider } from 'components/Sider'
import { useGit } from 'services/git'
import OfflineIndicator from 'components/Offline'

import styles from './header.module.css'

const Header = ({ className }) => {
  const { isAuthenticated } = useAuth()
  const { isMobile } = useDeviceDetect()
  const { currentNote, currentNotebook } = useNotebook()
  const { goToNote, toNote } = useRouter()
  const { open, close } = useSider()
  const { commitAndPush } = useGit()

  const onClickDeleteNote = async () => {
    await deleteNote(currentNote)
    goToNote(currentNote, { parent: true })
    commitAndPush(`Delete note "${currentNote.name}"`)
  }

  const onClickDeleteNotebook = async () => {
    await deleteNotebook(currentNotebook)
    goToNote(currentNotebook, { parent: true })
    commitAndPush(`Delete notebook ${currentNotebook.name}`)
  }

  return (
    <header className={cn(styles.header, className)}>
      <div className={styles.brand}>
        {((currentNotebook && currentNotebook.level > 0) || currentNote) && (
          <Link
            className={styles.backButton}
            to={toNote(currentNote || currentNotebook, { parent: true })}
            onClick={isMobile ? open : undefined}
          >
            <BackIcon />
          </Link>
        )}
        {currentNotebook && currentNotebook.level === 0 && !currentNote && (
          <KickNotesIcon className={styles.backButton} />
        )}
        <div className={styles.title}>
          {currentNotebook ? (
            <Link
              to={toNote(currentNotebook)}
              onClick={isMobile ? open : undefined}
            >
              {currentNotebook.name}
            </Link>
          ) : (
            'Kick notes'
          )}
        </div>
      </div>
      <div className={styles.nav}>
        <OfflineIndicator />
        {isAuthenticated && (
          <>
            {currentNote && (
              <button onClick={onClickDeleteNote} className="icon link">
                <DeleteIcon size={20} />
              </button>
            )}
            {!currentNote && currentNotebook && currentNotebook.level > 0 && (
              <button onClick={onClickDeleteNotebook} className="icon link">
                <DeleteIcon size={20} />
              </button>
            )}
            {currentNotebook && (
              <Link
                to={toNote(currentNotebook)}
                onClick={isMobile ? close : undefined}
              >
                <EditIcon size={20} />
              </Link>
            )}
            <Link to="/settings" onClick={isMobile ? close : undefined}>
              <SettingsIcon size={20} />
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
