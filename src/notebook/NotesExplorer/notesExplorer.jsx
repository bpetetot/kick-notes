import React from 'react'
import cn from 'classnames'
import ArrowUpIcon from 'react-feather/dist/icons/arrow-up'
import NotebookIcon from 'react-feather/dist/icons/layers'
import NoteIcon from 'react-feather/dist/icons/file'

import { useNote } from '../../note'
import { useNotebook } from '../context'
import IconLabel from '../../components/IconLabel'
import styles from './notesExplorer.module.css'

const NotesExplorer = ({ className }) => {
  const { currentNotebook, notes, openNotebook, goBack } = useNotebook()
  const { currentNote, openNote } = useNote()

  const open = item => {
    if (item.isDirectory) {
      openNotebook(item)
    } else {
      openNote(item)
    }
  }

  return (
    <div className={cn(styles.explorer, className)}>
      <div className={styles.infobar}>
        <div>{currentNotebook && currentNotebook.file}</div>
        {currentNotebook && currentNotebook.level > 0 && (
          <button className="link" onClick={goBack}>
            <ArrowUpIcon size={16} />
          </button>
        )}
      </div>
      <ul className={styles.list}>
        {notes.map(item => (
          <li
            key={item.file}
            className={cn(styles.item, {
              [styles.selected]: currentNote && currentNote.path === item.path,
            })}
            onClick={() => open(item)}
          >
            <IconLabel
              icon={item.isDirectory ? NotebookIcon : NoteIcon}
              size={16}
            >
              {item.file}
            </IconLabel>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NotesExplorer
