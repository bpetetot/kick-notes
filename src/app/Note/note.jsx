import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import DeleteIcon from 'react-feather/dist/icons/trash'

import { useSync } from 'services/git'
import { useSettings } from 'services/settings'
import { getQueryParam } from 'services/router'
import { getNote, updateNote, deleteNote } from 'services/notebook'
import MarkdownPreview from 'components/MarkdownPreview'

import AddNote from '../Add'
import styles from './note.module.css'

const updateNoteDebounced = debounce(updateNote, 5000)

const Note = ({ className, location, history }) => {
  const [note, setNote] = useState()
  const [content, setContent] = useState(note && note.content)
  const [isSaved, setIsSaved] = useState(true)
  const { isRepoLoaded } = useSync()
  const { settings } = useSettings()

  const path = getQueryParam(location, 'path')

  useEffect(() => {
    if (!isRepoLoaded) return
    getNote(path).then(note => {
      setNote(note)
      setIsSaved(true)
      if (note) setContent(note.content)
    })

    return () => {
      // save changes when component unmount
      if (!isSaved) updateNoteDebounced.flush()
    }
  }, [isRepoLoaded, path]) // eslint-disable-line

  const onEditNote = event => {
    if (isSaved) {
      setIsSaved(false)
    }
    const content = event.target.value
    setContent(content)
    updateNoteDebounced(note, content, () => {
      setIsSaved(true)
    })
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
              value={content}
              className={styles.editor}
            />
          ) : (
            <MarkdownPreview className={styles.preview} content={content} />
          )}
        </>
      ) : (
        <AddNote />
      )}
    </div>
  )
}

export default withRouter(Note)
