import React from 'react'

import { useNotes } from '../notes'

const Notes = () => {
  const { currentFolder, notes, open, goBack } = useNotes()

  return (
    <div>
      {currentFolder && currentFolder.level > 0 && (
        <button onClick={goBack}>Back</button>
      )}
      {notes.map(note => (
        <div key={note.file} onClick={() => open(note)}>
          {note.file}
        </div>
      ))}
    </div>
  )
}

export default Notes
