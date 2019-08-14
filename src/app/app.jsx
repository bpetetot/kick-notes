import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import { useAuth0, AUTH_REDIRECT_PATH } from '../auth'
import PrivateRoute from '../components/PrivateRoute'
import Home from '../home'

const App = () => {
  const { loading } = useAuth0()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" component={Home} exact />
        <PrivateRoute path={AUTH_REDIRECT_PATH} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default App
