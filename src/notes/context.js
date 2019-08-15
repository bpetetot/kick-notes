import React, { useEffect, useContext, useState } from 'react'

import { getRepoFolder, fetchRepo, list } from '../git'

const NotesContext = React.createContext()

export const useNotes = () => useContext(NotesContext)

export const NotesProvider = ({ children, user, isOnline }) => {
  const [currentFolder] = useState(getRepoFolder(user))
  const [notes, setNotes] = useState([])

  useEffect(() => {
    if (!user) return
    const load = async () => {
      await fetchRepo(user, console.log)
      const _notes = await list(currentFolder)
      setNotes(_notes)
    }
    if (isOnline) {
      load()
    }
  }, [user, isOnline, currentFolder])

  return (
    <NotesContext.Provider value={{ notes }}>{children}</NotesContext.Provider>
  )
}
