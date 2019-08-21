import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import DeleteIcon from 'react-feather/dist/icons/trash'
import MaximizeIcon from 'react-feather/dist/icons/maximize-2'
import MinimizeIcon from 'react-feather/dist/icons/minimize-2'

import { useNotebook } from 'services/notebook'
import { useRouter } from 'services/router'
import { useGit } from 'services/git'
import { useSettings } from 'services/settings'
import { updateNote, deleteNote } from 'services/notebook'
import { useDeviceDetect } from 'services/device'
import NoteNameInput from 'components/NoteNameInput'
import MarkdownPreview from 'components/MarkdownPreview'
import { useSider } from 'components/Sider/context'

import AddNote from '../Add'
import styles from './note.module.css'

const updateNoteDebounced = debounce(updateNote, 5000)

const Note = ({ className }) => {
  const { currentNote } = useNotebook()
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

  const onRenameNote = renamed => {
    openNoteRoute({ note: renamed.path, notebook: renamed.parent })
  }

  const onClickDeleteNote = async () => {
    await deleteNote(currentNote)
    openNoteRoute({ notebook: currentNote.parent })
    commitAndPush(`Delete note "${currentNote.name}"`)
  }

  return (
    <div className={cn(styles.note, className)}>
      <div className={styles.infobar}>
        <div className={styles.name}>
          {currentNote && (
            <NoteNameInput note={currentNote} onChange={onRenameNote} />
          )}
        </div>
        <div className={styles.actions}>
          {currentNote && (
            <>
              {!isSaved && <div>Not saved</div>}
              <button onClick={onClickDeleteNote} className="link">
                <DeleteIcon size={16} />
              </button>
            </>
          )}
          {!isMobile && (
            <button onClick={toggle} className="link">
              {isOpen ? <MaximizeIcon size={16} /> : <MinimizeIcon size={16} />}
            </button>
          )}
        </div>
      </div>
      {currentNote && settings.editorMode && (
        <textarea
          value={content}
          onChange={onEditNote}
          onBlur={onEditNote}
          className={styles.editor}
        />
      )}
      {currentNote && !settings.editorMode && (
        <MarkdownPreview className={styles.preview} content={content} />
      )}
      {!currentNote && <AddNote />}
    </div>
  )
}

export default Note
