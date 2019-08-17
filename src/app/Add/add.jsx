import React from 'react'

import styles from './add.module.css'

const AddNote = () => {
  return (
    <div className={styles.addNote}>
      <button className="button-primary">New note</button>
      <button>New notebook</button>
    </div>
  )
}

export default AddNote
