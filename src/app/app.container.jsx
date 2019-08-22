import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { useAuth, AUTH_REDIRECT_PATH } from 'services/auth'
import { SiderProvider } from 'components/Sider'
import PrivateRoute from 'services/auth/PrivateRoute'
import { RouterProvider } from 'services/router'
import { useNetwork } from 'services/network'
import { GitProvider } from 'services/git'
import { NotebookProvider } from 'services/notebook'
import { SettingsProvider } from 'services/settings'

import App from './app'
import Header from './Header'
import styles from './app.module.css'

const Layout = () => {
  const { user } = useAuth()
  const { isOnline } = useNetwork()

  return (
    <BrowserRouter>
      <RouterProvider>
        <SiderProvider>
          <GitProvider user={user} isOnline={isOnline}>
            <SettingsProvider>
              <NotebookProvider>
                <div className={styles.layout}>
                  <Header />
                  <div className={styles.main}>
                    <Switch>
                      <Route exact path={AUTH_REDIRECT_PATH} />
                      <PrivateRoute path="/" component={App} />
                    </Switch>
                  </div>
                </div>
              </NotebookProvider>
            </SettingsProvider>
          </GitProvider>
        </SiderProvider>
      </RouterProvider>
    </BrowserRouter>
  )
}

export default Layout
