import React from 'react'
import cn from 'classnames'
import { BrowserRouter, Route } from 'react-router-dom'

import { useAuth, AUTH_REDIRECT_PATH } from '../auth'
import { SiderProvider } from '../components/Sider'
import Loading from '../components/Loading'
import Home from '../home'
import Header from './Header'
import PrivateRoute from '../auth/PrivateRoute'

import theme from '../styles/theme.module.css'
import styles from './app.module.css'

const App = () => {
  const { loading } = useAuth()

  return (
    <BrowserRouter>
      <div className={cn(styles.app, theme.default)}>
        <SiderProvider>
          <Header />
          <div className={styles.wrapper}>
            {loading && <Loading />}
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path={AUTH_REDIRECT_PATH} />
          </div>
        </SiderProvider>
      </div>
    </BrowserRouter>
  )
}

export default App
