import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import cn from 'classnames'
import DeleteIcon from 'react-feather/dist/icons/trash'

import { useSync } from 'services/git'
import { useSettings } from 'services/settings'
import { getQueryParam } from 'services/router'
import { getNote, deleteNote } from 'services/notebook'
import MarkdownPreview from 'components/MarkdownPreview'

import AddNote from '../Add'
import styles from './note.module.css'

const Note = ({ className, location, history }) => {
  const [note, setNote] = useState()
  const [isSaved, setIsSaved] = useState(true)
  const { isRepoLoaded } = useSync()

  const path = getQueryParam(location, 'path')
  const { settings } = useSettings()

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

  const onClickDeleteNote = async () => {
    history.push({
      pathname: '/note',
      search: `?path=${note.parent}`,
    })
    await deleteNote(note)
  }

  return (
    <div className={cn(styles.note, className)}>
      {note ? (
        <>
          <div className={styles.infobar}>
            <div>{note.name}</div>
            <div className={styles.actions}>
              {!isSaved && <div>Not saved</div>}
              <DeleteIcon
                className="link"
                size={16}
                onClick={onClickDeleteNote}
              />
            </div>
          </div>
          {settings.editorMode ? (
            <textarea
              onChange={onEditNote}
              onBlur={onEditNote}
              defaultValue={note.content}
              className={styles.editor}
            />
          ) : (
            <MarkdownPreview
              className={styles.preview}
              content={note.content}
            />
          )}
        </>
      ) : (
        <AddNote />
      )}
    </div>
  )
}

export default withRouter(Note)
