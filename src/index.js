import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AuthProvider, AUTH_REDIRECT_PATH } from './services/auth'
import { NetworkProvider } from './services/network'
import { FullscreenProvider } from './services/fullscreen'
import PrivateRoute from './services/auth/PrivateRoute'
import * as git from './services/git'
import * as firebase from './services/firebase'
import App from './app'
import './styles/base.css'

firebase.initialize()

git.initialize()

ReactDOM.render(
  <NetworkProvider>
    <FullscreenProvider>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path={AUTH_REDIRECT_PATH} />
            <PrivateRoute path="/" component={App} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </FullscreenProvider>
  </NetworkProvider>,
  document.getElementById('root')
)

// import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
