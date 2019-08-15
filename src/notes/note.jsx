import React, { useEffect, useState } from 'react'

import { readFile } from '../git'
import { useNotes } from '../notes'

const Note = () => {
  const { currentNote } = useNotes()
  const [content, setContent] = useState()

  useEffect(() => {
    if (!currentNote) return
    readFile(currentNote.path).then(fileContent => setContent(fileContent))
  }, [currentNote]) // eslint-disable-line

  if (!currentNote) return null

  return <div>{content}</div>
}

export default Note
