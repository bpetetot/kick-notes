import React from 'react'
import cn from 'classnames'

import { useAuth } from 'services/auth'
import { useNetwork } from 'services/network'
import { GitProvider } from 'services/git'
import { NotebookProvider } from 'services/notebook'
import { useDeviceDetect } from 'services/device'

import LoadingScreen from './Loading'
import Header from './Header'
import AppDesktop from './app.desktop'
import AppMobile from './app.mobile'
import styles from './app.module.css'
import { useFullscreen } from 'services/fullscreen'

const Layout = () => {
  const { user } = useAuth()
  const { isOnline } = useNetwork()
  const { isMobile } = useDeviceDetect()
  const { fullscreen } = useFullscreen()

  return (
    <GitProvider user={user} isOnline={isOnline}>
      <NotebookProvider>
        <LoadingScreen>
          {!fullscreen && <Header />}
          <div className={cn(styles.main, { [styles.fullscreen]: fullscreen })}>
            {isMobile ? <AppMobile /> : <AppDesktop />}
          </div>
        </LoadingScreen>
      </NotebookProvider>
    </GitProvider>
  )
}

export default Layout
