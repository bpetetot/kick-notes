import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'

import { getQueryParam, buildQueryString } from './services'

const RouterContext = React.createContext()

export const useRouter = () => useContext(RouterContext)

const RouterProvider = ({ children, location, history }) => {
  const notebookPath = getQueryParam(location, 'notebook')
  const notePath = getQueryParam(location, 'note')

  const buildNoteRoute = ({ note, notebook }) => {
    return {
      pathname: '/note',
      search: buildQueryString({ notebook, note }),
    }
  }

  const openNoteRoute = ({ note, notebook }) => {
    history.push(buildNoteRoute({ note, notebook }))
  }

  return (
    <RouterContext.Provider
      value={{
        notebookPath,
        notePath,
        buildNoteRoute,
        openNoteRoute,
      }}
    >
      {children}
    </RouterContext.Provider>
  )
}

export default withRouter(RouterProvider)
