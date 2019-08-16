import React from 'react'
import ArrowUpIcon from 'react-feather/dist/icons/arrow-up'

import { useNote } from '../../note'
import { useNotebook } from '../context'

import styles from './notesList.module.css'

const NotesList = ({ className }) => {
  const { currentNotebook, notes, openNotebook, goBack } = useNotebook()
  const { openNote } = useNote()

  const open = item => {
    if (item.isDirectory) {
      openNotebook(item)
    } else {
      openNote(item)
    }
  }

  return (
    <div className={className}>
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
          <li key={item.file} onClick={() => open(item)}>
            {item.file}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NotesList
