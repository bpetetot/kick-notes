import React from 'react'
import { Route } from 'react-router-dom'

import { useAuth } from '../../auth'
import Login from '../Login'

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { isAuthenticated } = useAuth()

  const render = props => {
    if (!Component) return null
    if (!isAuthenticated) return <Login {...props} />
    return <Component {...props} />
  }

  return <Route path={path} render={render} {...rest} />
}

export default PrivateRoute
