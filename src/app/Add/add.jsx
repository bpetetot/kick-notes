import React from 'react'

import { useNotebook, addNote, addNotebook } from 'services/notebook'
import { useRouter } from 'services/router'

import styles from './add.module.css'

const AddNote = () => {
  const { currentNotebook } = useNotebook()
  const { openNoteRoute } = useRouter()

  const onClickAddNote = async () => {
    const newNote = await addNote(currentNotebook)
    openNoteRoute({ notebook: newNote.parent, note: newNote.path, new: true })
  }

  const onClickAddNotebook = async () => {
    const newNotebook = await addNotebook(currentNotebook)
    openNoteRoute({ notebook: newNotebook.path, new: true })
  }

  return (
    <div className={styles.addNote}>
      <button className="button-primary" onClick={onClickAddNote}>
        New note
      </button>
      <button onClick={onClickAddNotebook}>New notebook</button>
    </div>
  )
}

export default AddNote
