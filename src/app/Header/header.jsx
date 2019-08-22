import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import AddIcon from 'react-feather/dist/icons/plus'
import BackIcon from 'react-feather/dist/icons/arrow-left'
import DeleteIcon from 'react-feather/dist/icons/trash'

import { useNotebook, deleteNote, deleteNotebook } from 'services/notebook'
import { useRouter } from 'services/router'
import { useDeviceDetect } from 'services/device'
import { useSider } from 'components/Sider'
import { useGit } from 'services/git'
import OfflineIndicator from 'components/Offline'

import styles from './header.module.css'

const Header = ({ className }) => {
  const { isMobile } = useDeviceDetect()
  const { currentNote, currentNotebook } = useNotebook()
  const { openNoteRoute, buildNoteRoute } = useRouter()
  const { toggle } = useSider()
  const { commitAndPush } = useGit()

  const onClickDeleteNote = async () => {
    await deleteNote(currentNote)
    openNoteRoute({ path: currentNote.parent })
    commitAndPush(`Delete note "${currentNote.name}"`)
  }

  const onClickDeleteNotebook = async () => {
    await deleteNotebook(currentNotebook)
    openNoteRoute({ path: currentNotebook.parent })
    commitAndPush(`Delete notebook ${currentNotebook.name}`)
  }

  return (
    <header className={cn(styles.header, className)}>
      <div className={styles.brand}>
        {((currentNotebook && currentNotebook.level > 0) || currentNote) && (
          <Link
            className={styles.backButton}
            to={buildNoteRoute({
              path:
                (currentNote && currentNote.parent) ||
                (currentNotebook && currentNotebook.parent),
            })}
            onClick={currentNote && isMobile ? toggle : undefined}
          >
            <BackIcon />
          </Link>
        )}
        <div className={styles.title}>
          {currentNotebook ? (
            <Link
              to={buildNoteRoute({ path: currentNotebook.path })}
              onClick={currentNote && isMobile ? toggle : undefined}
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
        {currentNote && (
          <button onClick={onClickDeleteNote} className="link">
            <DeleteIcon size={20} />
          </button>
        )}
        {!currentNote && currentNotebook && currentNotebook.level > 0 && (
          <button onClick={onClickDeleteNotebook} className="link">
            <DeleteIcon size={20} />
          </button>
        )}
        {currentNotebook && (
          <Link
            to={buildNoteRoute({ path: currentNotebook.path })}
            onClick={isMobile ? toggle : undefined}
          >
            <AddIcon />
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
