import React from 'react'

import { useNotebook, addNote, addNotebook } from 'services/notebook'
import { useRouter } from 'services/router'
import { useGit } from 'services/git'
import Loading from 'components/Loading'

import styles from './add.module.css'

const AddNote = () => {
  const { currentNotebook } = useNotebook()
  const { openNoteRoute } = useRouter()
  const { commitAndPush } = useGit()

  const onClickAddNote = async () => {
    const newNote = await addNote(currentNotebook)
    openNoteRoute({ notebook: newNote.parent, note: newNote.path, new: true })
    commitAndPush('Add new note')
  }

  const onClickAddNotebook = async () => {
    const newNotebook = await addNotebook(currentNotebook)
    openNoteRoute({ notebook: newNotebook.path, new: true })
  }

  if (!currentNotebook) {
    return <Loading />
  }

  return (
    <div className={styles.addNote}>
      <h2>{currentNotebook.name}</h2>
      <button className="button-primary" onClick={onClickAddNote}>
        New note
      </button>
      <button onClick={onClickAddNotebook}>New notebook</button>
    </div>
  )
}

export default AddNote
