import React, { useEffect, useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'

import { useSync } from '../services/git'
import { getQueryParam } from '../services/router'
import { getNotebook, listNotes } from './service'

const NotebookContext = React.createContext()

export const useNotebook = () => useContext(NotebookContext)

const NotebookProvider = ({ children, location }) => {
  const [currentNotebook, setCurrentNotebook] = useState()
  const [notes, setNotes] = useState([])
  const { isRepoLoaded } = useSync()

  const path = getQueryParam(location, 'path')

  useEffect(() => {
    if (!isRepoLoaded) return

    getNotebook(path).then(notebook => {
      listNotes(notebook.path).then(notes => {
        setNotes(notes)
        setCurrentNotebook(notebook)
      })
    })
  }, [isRepoLoaded, path]) // eslint-disable-line

  return (
    <NotebookContext.Provider value={{ currentNotebook, notes }}>
      {children}
    </NotebookContext.Provider>
  )
}

export default withRouter(NotebookProvider)
