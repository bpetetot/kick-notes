import React from 'react'

import { useNote } from '../context'

import styles from './note.module.css'

const Note = ({ className }) => {
  const { currentNote, content, onEditNote, isSaved } = useNote()

  return (
    <div className={className}>
      {currentNote && (
        <>
          <div className={styles.infobar}>
            <div>{currentNote.file}</div>
            <div>{isSaved ? 'Saved' : 'Not saved'}</div>
          </div>
          <div
            className={styles.editor}
            onInput={onEditNote}
            onBlur={onEditNote}
            contentEditable
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </>
      )}
    </div>
  )
}

export default Note