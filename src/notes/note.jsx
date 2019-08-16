import React from 'react'

import { useNote } from './noteContext'

const Note = () => {
  const { currentNote, content, onEditNote, isSaved } = useNote()

  if (!currentNote) return null

  return (
    <>
      <strong>{isSaved ? 'Saved' : 'Not saved'}</strong>
      <div
        onInput={onEditNote}
        onBlur={onEditNote}
        contentEditable
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  )
}

export default Note
