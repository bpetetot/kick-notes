import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import MaximizeIcon from 'react-feather/dist/icons/maximize-2'
import MinimizeIcon from 'react-feather/dist/icons/minimize-2'

import { useNotebook } from 'services/notebook'
import { useRouter } from 'services/router'
import { useGit } from 'services/git'
import { useSettings } from 'services/settings'
import { updateNote } from 'services/notebook'
import { useDeviceDetect } from 'services/device'
import NoteNameInput from 'components/NoteNameInput'
import MarkdownPreview from 'components/MarkdownPreview'
import { useSider } from 'components/Sider/context'

import Notebook from '../Notebook'
import styles from './note.module.css'

const updateNoteDebounced = debounce(updateNote, 5000)

const Note = ({ className }) => {
  const { currentNote, currentNotebook } = useNotebook()
  const { settings } = useSettings()
  const { openNoteRoute } = useRouter()
  const { isOpen, toggle } = useSider()
  const { isMobile } = useDeviceDetect()
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

  const onRenameNote = renamed => {
    openNoteRoute({ path: renamed.path })
  }

  return (
    <div className={cn(styles.note, className)}>
      <div className={styles.infobar}>
        <div className={styles.name}>
          {currentNote && (
            <NoteNameInput note={currentNote} onChange={onRenameNote} />
          )}
          {!currentNote && currentNotebook && currentNotebook.level > 0 && (
            <NoteNameInput note={currentNotebook} onChange={onRenameNote} />
          )}
          {!currentNote && currentNotebook && currentNotebook.level === 0 && (
            <h1>Kick Notes</h1>
          )}
        </div>
        <div className={styles.actions}>
          {currentNote && !isSaved && <div>Not saved</div>}
          {!isMobile && (
            <button onClick={toggle} className="link">
              {isOpen ? <MaximizeIcon size={20} /> : <MinimizeIcon size={20} />}
            </button>
          )}
        </div>
      </div>
      {currentNote && settings.editorMode && (
        <textarea
          value={content}
          onChange={onEditNote}
          onBlur={onBlurEdit}
          className={styles.editor}
        />
      )}
      {currentNote && !settings.editorMode && (
        <MarkdownPreview className={styles.preview} content={content} />
      )}
      {!currentNote && <Notebook />}
    </div>
  )
}

export default Note
