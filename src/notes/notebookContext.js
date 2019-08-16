import React, { useEffect, useContext, useState } from 'react'

import { list } from '../git'

const NotebookContext = React.createContext()

export const useNotebook = () => useContext(NotebookContext)

export const NotebookProvider = ({ children, defaultNotebook }) => {
  const [currentNotebook, setCurrentNotebook] = useState(defaultNotebook)
  const [notes, setNotes] = useState([])

  useEffect(() => {
    if (!currentNotebook) return
    list(currentNotebook.path).then(notes => setNotes(notes))
  }, [currentNotebook])

  const openNotebook = async notebook => {
    if (!notebook.isDirectory) return
    const _notes = await list(notebook.path)
    if (!notebook.parent) {
      notebook.parent = currentNotebook
    }
    setNotes(_notes)
    setCurrentNotebook(notebook)
  }

  const goBack = async () => {
    const { parent } = currentNotebook
    if (parent) {
      await openNotebook(parent)
    }
  }

  return (
    <NotebookContext.Provider
      value={{ currentNotebook, notes, openNotebook, goBack }}
    >
      {children}
    </NotebookContext.Provider>
  )
}
