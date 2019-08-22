import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import debounce from 'lodash/debounce'

import { useNotebook } from 'services/notebook'
import { useGit } from 'services/git'
import { useSettings } from 'services/settings'
import { updateNote } from 'services/notebook'
import NoteTitleBar from 'components/NoteTitleBar'
import MarkdownPreview from 'components/MarkdownPreview'

import styles from './note.module.css'

const updateNoteDebounced = debounce(updateNote, 5000)

const Note = ({ className }) => {
  const { currentNote } = useNotebook()
  const { settings } = useSettings()
  const { isRepoLoaded, commitAndPush } = useGit()

  const [content, setContent] = useState()
  const [isSaved, setIsSaved] = useState(true)

  useEffect(() => {
    if (!isRepoLoaded) return

    if (currentNote) {
      if (!isSaved) updateNoteDebounced.flush()
      setContent(currentNote.content)
    }

    return () => {
      // save changes when component unmount
      if (!isSaved) updateNoteDebounced.flush()
    }
  }, [isRepoLoaded, currentNote]) // eslint-disable-line

  const onEditNote = event => {
    if (isSaved) setIsSaved(false)

    const newContent = event.target.value
    if (content === newContent) return

    setContent(newContent)
    updateNoteDebounced(currentNote, newContent, () => {
      setIsSaved(true)
      commitAndPush(`Save note "${currentNote.name}"`)
    })
  }

  const onBlurEdit = () => {
    if (!isSaved) updateNoteDebounced.flush()
  }

  if (!currentNote) return null

  return (
    <div className={cn(styles.note, className)}>
      <NoteTitleBar note={currentNote} />
      {settings.editorMode ? (
        <textarea
          value={content}
          onChange={onEditNote}
          onBlur={onBlurEdit}
          className={styles.editor}
        />
      ) : (
        <MarkdownPreview className={styles.preview} content={content} />
      )}
    </div>
  )
}

export default Note
