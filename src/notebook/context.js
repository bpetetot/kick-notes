import React, { useEffect, useContext, useState } from 'react'

import { list, ROOT_FOLDER } from '../git'

const NotebookContext = React.createContext()

export const useNotebook = () => useContext(NotebookContext)

const DEFAULT_NOTEBOOK = {
  file: 'All notebooks',
  path: ROOT_FOLDER,
  level: 0,
  isDirectory: true,
}

export const NotebookProvider = ({ children }) => {
  const [currentNotebook, setCurrentNotebook] = useState(DEFAULT_NOTEBOOK)
  const [notes, setNotes] = useState([])

  useEffect(() => {
    if (!currentNotebook) return
    list(currentNotebook.path).then(notes => setNotes(notes))
  }, [currentNotebook])

  const openNotebook = async notebook => {
    if (!notebook.isDirectory) return
    if (!notebook.parent) {
      notebook.parent = currentNotebook
    }
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
