import React from 'react'
import ReactDOM from 'react-dom'

import { AuthProvider } from './auth'
import { NetworkProvider } from './helpers/network'
import * as git from './git'
import * as firebase from './firebase'
import App from './app'
import './index.css'

firebase.initialize()

git.initialize()

ReactDOM.render(
  <AuthProvider>
    <NetworkProvider>
      <App />
    </NetworkProvider>
  </AuthProvider>,
  document.getElementById('root')
)

// import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
