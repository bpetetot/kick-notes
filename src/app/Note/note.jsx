import React, { useEffect } from 'react'
import cn from 'classnames'
import debounce from 'lodash/debounce'

import { useNotebook } from 'services/notebook'
import { useGit } from 'services/git'
import { useSettings } from 'services/settings'
import { updateNote } from 'services/notebook'
import { MarkdownEditor } from 'components/Editors'
import NoteTitleBar from 'components/NoteTitleBar'
import MarkdownPreview from 'components/MarkdownPreview'

import styles from './note.module.css'

const updateNoteDebounced = debounce(updateNote, 5000)

const Note = ({ className }) => {
  const { currentNote, setCurrentNote } = useNotebook()
  const { settings } = useSettings()
  const { commitAndPush } = useGit()

  useEffect(() => {
    return () => {
      updateNoteDebounced.flush()
    }
  }, [])

  const onEditNote = newContent => {
    if (currentNote.content === newContent) return
    updateNoteDebounced(currentNote, newContent, () => {
      setCurrentNote({ ...currentNote, content: newContent })
      commitAndPush(`Save note "${currentNote.name}"`)
    })
  }

  const onBlurEdit = () => {
    updateNoteDebounced.flush()
  }

  if (!currentNote) return null

  return (
    <div className={cn(styles.note, className)}>
      <NoteTitleBar note={currentNote} />
      {settings.editorMode && (
        <MarkdownEditor
          note={currentNote}
          onChange={onEditNote}
          onBlur={onBlurEdit}
          toolbar={settings.editorToolbar}
          spellCheck={settings.editorSpellCheck}
        />
      )}
      {!settings.editorMode && (
        <MarkdownPreview
          className={styles.preview}
          content={currentNote.content}
        />
      )}
    </div>
  )
}

export default Note
