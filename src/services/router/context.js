import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'

import { getQueryParam, buildQueryString } from './services'

const RouterContext = React.createContext()

export const useRouter = () => useContext(RouterContext)

const RouterProvider = ({ children, location, history }) => {
  const path = getQueryParam(location, 'path')
  const isNew = Boolean(getQueryParam(location, 'new'))

  const toNote = (note, { parent, ...params } = {}) => {
    return {
      pathname: note.isNote && !parent ? '/note' : '/notebook',
      search: buildQueryString({
        path: parent ? note.parent : note.path,
        ...(params || {}),
      }),
    }
  }

  const goToNote = (note, options) => {
    history.push(toNote(note, options))
  }

  return (
    <RouterContext.Provider
      value={{
        path,
        isNew,
        toNote,
        goToNote,
      }}
    >
      {children}
    </RouterContext.Provider>
  )
}

export default withRouter(RouterProvider)
