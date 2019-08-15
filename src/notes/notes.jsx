import React from 'react'

import { useNotes } from '../notes'

const Notes = () => {
  const { notes } = useNotes()

  return (
    <div>
      {notes.map(note => (
        <div key={note.file}>{note.file}</div>
      ))}
    </div>
  )
}

export default Notes
