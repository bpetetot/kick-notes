import React, { useEffect, useContext, useState } from 'react'

import { getRepoFolder, fetchRepo, list } from '../git'

const NotesContext = React.createContext()

export const useNotes = () => useContext(NotesContext)

export const NotesProvider = ({ children, user, isOnline }) => {
  const [currentFolder, setCurrentFolder] = useState({
    path: getRepoFolder(user),
    level: 0,
    isDirectory: true,
  })
  const [currentNote, setCurrentNote] = useState()
  const [notes, setNotes] = useState([])

  useEffect(() => {
    if (!user) return
    const load = async () => {
      if (isOnline) {
        await fetchRepo(user, console.log)
      }
      const _notes = await list(currentFolder.path)
      setNotes(_notes)
    }
    load()
  }, [user, isOnline]) // eslint-disable-line

  const open = async file => {
    if (file.isDirectory) {
      const _notes = await list(file.path)
      if (!file.parent) {
        file.parent = currentFolder
      }
      setNotes(_notes)
      setCurrentFolder(file)
    } else {
      setCurrentNote(file)
    }
  }

  const goBack = async () => {
    const { parent } = currentFolder
    if (parent) {
      await open(parent)
    }
  }

  return (
    <NotesContext.Provider
      value={{ notes, currentNote, currentFolder, open, goBack }}
    >
      {children}
    </NotesContext.Provider>
  )
}
