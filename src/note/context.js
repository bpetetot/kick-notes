import React, { useEffect, useContext, useState } from 'react'

import { readFile } from '../git'

const NoteContext = React.createContext()

export const useNote = () => useContext(NoteContext)

export const NoteProvider = ({ children }) => {
  const [currentNote, setCurrentNote] = useState()
  const [content, setContent] = useState()
  const [isSaved, setIsSaved] = useState(true)

  useEffect(() => {
    if (!currentNote) return
    readFile(currentNote.path).then(fileContent => {
      setContent(fileContent)
      setIsSaved(true)
    })
  }, [currentNote])

  const openNote = note => {
    setCurrentNote(note)
  }

  const onEditNote = event => {
    if (isSaved) {
      setIsSaved(false)
    }
    console.log(event.target.innerText)
  }

  return (
    <NoteContext.Provider
      value={{ content, openNote, onEditNote, isSaved, currentNote }}
    >
      {children}
    </NoteContext.Provider>
  )
}
