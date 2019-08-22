import React from 'react'

import { useNotebook, addNote, addNotebook } from 'services/notebook'
import { useRouter } from 'services/router'
import { useGit } from 'services/git'

import styles from './notebook.module.css'

const Notebook = () => {
  const { currentNotebook } = useNotebook()
  const { openNoteRoute } = useRouter()
  const { commitAndPush } = useGit()

  const onClickAddNote = async () => {
    const newNote = await addNote(currentNotebook)
    openNoteRoute({ path: newNote.path, new: true })
    commitAndPush('Add new note')
  }

  const onClickAddNotebook = async () => {
    const newNotebook = await addNotebook(currentNotebook)
    openNoteRoute({ path: newNotebook.path, new: true })
  }

  return (
    <div className={styles.notebook}>
      <button className="button-primary" onClick={onClickAddNote}>
        New note
      </button>
      <button onClick={onClickAddNotebook}>New notebook</button>
    </div>
  )
}

export default Notebook
