import React from 'react'

import { useAuth } from 'services/auth'
import { useNetwork } from 'services/network'
import { GitProvider } from 'services/git'
import { NotebookProvider } from 'services/notebook'
import { SettingsProvider } from 'services/settings'
import { useDeviceDetect } from 'services/device'

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
      <SettingsProvider>
        <NotebookProvider>
          <div className={styles.layout}>
            {!fullscreen && <Header />}
            <div className={styles.main}>
              {isMobile ? <AppMobile /> : <AppDesktop />}
            </div>
          </div>
        </NotebookProvider>
      </SettingsProvider>
    </GitProvider>
  )
}

export default Layout
