import React from 'react'

import { useNotebook } from './notebookContext'
import { useNote } from './noteContext'

const Notes = () => {
  const { currentNotebook, notes, openNotebook, goBack } = useNotebook()
  const { openNote } = useNote()

  const open = item => {
    if (item.isDirectory) {
      openNotebook(item)
    } else {
      openNote(item)
    }
  }

  return (
    <div>
      {currentNotebook && currentNotebook.level > 0 && (
        <button onClick={goBack}>Back</button>
      )}
      {notes.map(item => (
        <div key={item.file} onClick={() => open(item)}>
          {item.file}
        </div>
      ))}
    </div>
  )
}

export default Notes
