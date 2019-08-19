import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import DeleteIcon from 'react-feather/dist/icons/trash'

import { useNotebook } from 'services/notebook'
import { useRouter } from 'services/router'
import { useSync } from 'services/git'
import { useSettings } from 'services/settings'
import { updateNote, deleteNote } from 'services/notebook'
import NoteNameInput from 'components/NoteNameInput'
import MarkdownPreview from 'components/MarkdownPreview'

import AddNote from '../Add'
import styles from './note.module.css'

const updateNoteDebounced = debounce(updateNote, 5000)

const Note = ({ className }) => {
  const { currentNote } = useNotebook()
  const { isRepoLoaded } = useSync()
  const { settings } = useSettings()
  const { openNoteRoute } = useRouter()

  const [content, setContent] = useState()
  const [isSaved, setIsSaved] = useState(true)

  useEffect(() => {
    if (!isRepoLoaded) return

    if (currentNote) {
      setContent(currentNote.content)
    }

    return () => {
      // save changes when component unmount
      if (!isSaved) updateNoteDebounced.flush()
    }
  }, [isRepoLoaded, currentNote]) // eslint-disable-line

  const onEditNote = event => {
    if (isSaved) setIsSaved(false)
    const content = event.target.value
    setContent(content)
    updateNoteDebounced(currentNote, content, () => {
      setIsSaved(true)
    })
  }

  const onRenameNote = renamed => {
    openNoteRoute({ note: renamed.path, notebook: renamed.parent })
  }

  const onClickDeleteNote = async () => {
    await deleteNote(currentNote)
    openNoteRoute({ notebook: currentNote.parent })
  }

  return (
    <div className={cn(styles.note, className)}>
      {currentNote ? (
        <>
          <div className={styles.infobar}>
            <div className={styles.name}>
              <NoteNameInput note={currentNote} onChange={onRenameNote} />
            </div>
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

export default Note
