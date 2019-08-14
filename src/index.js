import React from 'react'
import ReactDOM from 'react-dom'

import { Auth0Provider } from './auth'
import * as git from './git'
import App from './app'
import './index.css'

git.initialize()

ReactDOM.render(
  <Auth0Provider>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
)

// import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
