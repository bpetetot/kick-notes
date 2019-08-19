import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import ArrowUpIcon from 'react-feather/dist/icons/arrow-up'
import AddIcon from 'react-feather/dist/icons/plus'
import NotebookIcon from 'react-feather/dist/icons/layers'
import NoteIcon from 'react-feather/dist/icons/file'
import DeleteNotebookIcon from 'react-feather/dist/icons/trash'

import { useNotebook, deleteNotebook } from 'services/notebook'
import { useRouter } from 'services/router'
import { useDeviceDetect } from 'services/device'
import { useSider } from 'components/Sider'
import IconLabel from 'components/IconLabel'
import NoteNameInput from 'components/NoteNameInput'

import styles from './notesExplorer.module.css'

const NotesExplorer = ({ className }) => {
  const { isMobile } = useDeviceDetect()
  const { toggle } = useSider()
  const { currentNotebook, notes } = useNotebook()
  const { notePath, openNoteRoute, buildNoteRoute } = useRouter()

  const onClickDeleteNotebook = async () => {
    await deleteNotebook(currentNotebook)
    openNoteRoute({ notebook: currentNotebook.parent })
  }

  const onRenameNotebook = async newNotebook => {
    openNoteRoute({ notebook: newNotebook.path })
  }

  return (
    <div className={cn(styles.explorer, className)}>
      <div className={styles.infobar}>
        <div className={styles.name}>
          {currentNotebook && currentNotebook.level > 0 ? (
            <NoteNameInput note={currentNotebook} onChange={onRenameNotebook} />
          ) : (
            <div className={cn(styles.name, styles.root)}>All notebooks</div>
          )}
        </div>
        <div className={styles.actions}>
          {currentNotebook && currentNotebook.level > 0 && (
            <Link to={buildNoteRoute({ notebook: currentNotebook.parent })}>
              <ArrowUpIcon size={16} />
            </Link>
          )}
          {currentNotebook && currentNotebook.level > 0 && (
            <DeleteNotebookIcon
              size={16}
              className="link"
              onClick={onClickDeleteNotebook}
            />
          )}
          {currentNotebook && (
            <Link
              to={buildNoteRoute({ notebook: currentNotebook.path })}
              onClick={isMobile ? toggle : undefined}
            >
              <AddIcon size={16} />
            </Link>
          )}
        </div>
      </div>
      <ul className={styles.list}>
        {notes.map(item => (
          <li
            key={item.file}
            className={cn(styles.item, {
              [styles.selected]: notePath === item.path,
            })}
          >
            <Link
              to={buildNoteRoute({
                note: item.isNote ? item.path : undefined,
                notebook: item.isNotebook ? item.path : item.parent,
              })}
              onClick={item.isNote && isMobile ? toggle : undefined}
            >
              <IconLabel
                icon={item.isNotebook ? NotebookIcon : NoteIcon}
                size={16}
              >
                {item.name}
              </IconLabel>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NotesExplorer
