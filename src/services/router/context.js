import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'

import { getQueryParam, buildQueryString } from './services'

const RouterContext = React.createContext()

export const useRouter = () => useContext(RouterContext)

const RouterProvider = ({ children, location, history }) => {
  const path = getQueryParam(location, 'path')
  const isNew = Boolean(getQueryParam(location, 'new'))

  const buildNoteRoute = params => {
    return {
      pathname: '/note',
      search: buildQueryString(params),
    }
  }

  const openNoteRoute = params => {
    history.push(buildNoteRoute(params))
  }

  return (
    <RouterContext.Provider
      value={{
        path,
        isNew,
        buildNoteRoute,
        openNoteRoute,
      }}
    >
      {children}
    </RouterContext.Provider>
  )
}

export default withRouter(RouterProvider)
