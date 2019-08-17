import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import cn from 'classnames'

import { useSync } from 'services/git'
import { getQueryParam } from 'services/router'
import { getNote } from 'services/notebook'

import AddNote from '../Add'
import styles from './note.module.css'

const Note = ({ className, location }) => {
  const [note, setNote] = useState()
  const [isSaved, setIsSaved] = useState(true)
  const { isRepoLoaded } = useSync()

  const path = getQueryParam(location, 'path')

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
            <div>{note.name}</div>
            <div>{isSaved ? 'Saved' : 'Not saved'}</div>
          </div>
          <textarea
            className={styles.editor}
            onChange={onEditNote}
            onBlur={onEditNote}
            defaultValue={note.content}
          />
        </>
      ) : (
        <AddNote />
      )}
    </div>
  )
}

export default withRouter(Note)
