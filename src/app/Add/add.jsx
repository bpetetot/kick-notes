import React from 'react'
import { withRouter } from 'react-router-dom'

import { useNotebook, addNote } from 'services/notebook'

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

  return (
    <div className={styles.addNote}>
      <button className="button-primary" onClick={onClickAddNote}>
        New note
      </button>
      <button>New notebook</button>
    </div>
  )
}

export default withRouter(AddNote)
