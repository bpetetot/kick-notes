import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'

import { useAuth0 } from '../../auth'

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, login } = useAuth0()

  useEffect(() => {
    if (loading || isAuthenticated) {
      return
    }
    const loginAndRedirect = async () => {
      await login({ appState: { targetUrl: path } })
    }
    loginAndRedirect()
  }, [loading, isAuthenticated, login, path])

  const render = props =>
    isAuthenticated === true && !!Component ? <Component {...props} /> : null

  return <Route path={path} render={render} {...rest} />
}

export default PrivateRoute
