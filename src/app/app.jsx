import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { useAuth, AUTH_REDIRECT_PATH } from '../auth'
import PrivateRoute from '../components/PrivateRoute'
import Home from '../home'

const App = () => {
  const { loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
        <PrivateRoute path={AUTH_REDIRECT_PATH} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default App
