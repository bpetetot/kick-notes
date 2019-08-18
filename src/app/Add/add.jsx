import React from 'react'
import { withRouter } from 'react-router-dom'

import { useNotebook, addNote, addNotebook } from 'services/notebook'

import styles from './add.module.css'

const AddNote = ({ history }) => {
  const { currentNotebook } = useNotebook()

  const onClickAddNote = async () => {
    const newNote = await addNote(currentNotebook)
    history.push({
      pathname: '/note',
      search: `?path=${newNote.path}`,
    })
  }

  const onClickAddNotebook = async () => {
    const newNotebook = await addNotebook(currentNotebook)
    history.push({
      pathname: '/note',
      search: `?path=${newNotebook.path}`,
    })
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

export default withRouter(AddNote)
