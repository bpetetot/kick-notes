import React from 'react'
import { Route } from 'react-router-dom'

import { useAuth } from 'services/auth'
import { useNotebook } from 'services/notebook'
import Login from 'components/Login'
import Loading from 'components/Loading'

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { isAuthenticated, loading } = useAuth()
  const { currentNotebook } = useNotebook()

  const render = props => {
    if (!loading && !isAuthenticated) return <Login {...props} />
    if (loading || !currentNotebook) return <Loading />
    return <Component {...props} />
  }

  return <Route path={path} render={render} {...rest} />
}

export default PrivateRoute
