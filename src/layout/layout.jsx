import React from 'react'
import cn from 'classnames'
import { BrowserRouter, Route } from 'react-router-dom'

import { useAuth, AUTH_REDIRECT_PATH } from '../services/auth'
import { SiderProvider } from '../components/Sider'
import Loading from '../components/Loading'
import App from '../app'
import Header from './Header'
import PrivateRoute from '../services/auth/PrivateRoute'

import theme from '../styles/theme.module.css'
import styles from './layout.module.css'

const Layout = () => {
  const { loading } = useAuth()

  return (
    <BrowserRouter>
      <div className={cn(styles.layout, theme.default)}>
        <SiderProvider>
          <Header />
          <div className={styles.main}>
            {loading && <Loading />}
            <Route exact path={AUTH_REDIRECT_PATH} />
            <PrivateRoute path="/" component={App} />
          </div>
        </SiderProvider>
      </div>
    </BrowserRouter>
  )
}

export default Layout
