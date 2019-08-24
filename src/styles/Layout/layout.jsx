import React from 'react'
import cn from 'classnames'

import { useSettings } from 'services/settings'

import styles from './layout.module.css'
import light from './theme-light.module.css'
import dark from './theme-dark.module.css'

const Layout = ({ children }) => {
  const { settings } = useSettings()

  return (
    <main
      className={cn(styles.layout, light.theme, {
        [dark.theme]: settings.darkMode,
      })}
    >
      {children}
    </main>
  )
}

export default Layout
