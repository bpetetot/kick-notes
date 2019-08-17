import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import cn from 'classnames'

import AddNote from '../Add'
import { useSync, getNote } from '../../git'
import styles from './note.module.css'

const Note = ({ className, location }) => {
  const [note, setNote] = useState()
  const [isSaved, setIsSaved] = useState(true)
  const { isRepoLoaded } = useSync()

  const params = new URLSearchParams(location.search)
  const path = params.get('path')

  useEffect(() => {
    if (!isRepoLoaded) return
    getNote(path).then(note => {
      setNote(note)
      setIsSaved(true)
    })
  }, [isRepoLoaded, path])

  const onEditNote = event => {
    if (isSaved) {
      setIsSaved(false)
    }
    console.log(event.target.innerText)
  }

  return (
    <div className={cn(styles.note, className)}>
      {note ? (
        <>
          <div className={styles.infobar}>
            <div>{note.file}</div>
            <div>{isSaved ? 'Saved' : 'Not saved'}</div>
          </div>
          <div
            className={styles.editor}
            onInput={onEditNote}
            onBlur={onEditNote}
            contentEditable
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        </>
      ) : (
        <AddNote />
      )}
    </div>
  )
}

export default withRouter(Note)
