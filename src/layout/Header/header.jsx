import React from 'react'
import cn from 'classnames'

import { useAuth } from 'services/auth'
import { useDeviceDetect } from 'services/device'
import { SiderButton } from 'components/Sider'
import OfflineIndicator from 'components/Offline'

import styles from './header.module.css'

const Header = ({ className }) => {
  const { user, isAuthenticated } = useAuth()
  const { isMobile } = useDeviceDetect()

  return (
    <header className={cn(styles.header, className)}>
      <div className={styles.brand}>
        {isAuthenticated && isMobile && (
          <div className={styles.siderButton}>
            <SiderButton />
          </div>
        )}
        <div className={styles.title}>Kick notes</div>
      </div>
      <div className={styles.nav}>
        <OfflineIndicator />
        {user && <span>{user.displayName}</span>}
      </div>
    </header>
  )
}

export default Header
