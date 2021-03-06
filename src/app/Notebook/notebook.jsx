import React from 'react'

import { useNotebook, addNote, addNotebook } from 'services/notebook'
import { useNavigation } from 'services/navigation'
import { useGit } from 'services/git'
import { useSettings } from 'services/settings'
import NoteTitleBar from 'components/NoteTitleBar'

import styles from './notebook.module.css'

const Notebook = () => {
  const { currentNotebook } = useNotebook()
  const { goToNote } = useNavigation()
  const { commitAndPush } = useGit()
  const { setSetting } = useSettings()

  const onClickAddNote = async () => {
    const newNote = await addNote(currentNotebook)
    setSetting('editorMode', true)
    goToNote(newNote, { new: true })
    commitAndPush('Add new note')
  }

  const onClickAddNotebook = async () => {
    const newNotebook = await addNotebook(currentNotebook)
    goToNote(newNotebook, { new: true })
  }

  return (
    <div className={styles.notebook}>
      <NoteTitleBar note={currentNotebook} />
      <div className={styles.content}>
        <button
          type="button"
          className="button-primary"
          onClick={onClickAddNote}
        >
          New note
        </button>
        <button type="button" onClick={onClickAddNotebook}>
          New notebook
        </button>
      </div>
    </div>
  )
}

export default Notebook
