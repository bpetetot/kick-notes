import React, { useState, useEffect, useContext } from 'react'

import { getNotebook, getNote, listNotes } from 'services/notebook'
import { useGit } from 'services/git'
import { useRouter } from 'services/router'

const NotebookContext = React.createContext()

export const useNotebook = () => useContext(NotebookContext)

const NotebookProvider = ({ children }) => {
  const [currentNotebook, setCurrentNotebook] = useState()
  const [currentNote, setCurrentNote] = useState()
  const [notes, setNotes] = useState([])
  const { isRepoLoaded } = useGit()
  const { notebookPath, notePath } = useRouter()

  useEffect(() => {
    if (!isRepoLoaded) return

    // load the current notebook
    getNotebook(notebookPath).then(notebook => {
      listNotes(notebook.path).then(notes => {
        setNotes(notes)
        setCurrentNotebook(notebook)
      })
    })

    // load the current note
    getNote(notePath).then(setCurrentNote)
  }, [isRepoLoaded, notebookPath, notePath]) // eslint-disable-line

  return (
    <NotebookContext.Provider
      value={{
        currentNotebook,
        currentNote,
        notes,
      }}
    >
      {children}
    </NotebookContext.Provider>
  )
}

export default NotebookProvider
