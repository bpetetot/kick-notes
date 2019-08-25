import React from 'react'
import cn from 'classnames'

import { useSettings } from 'services/settings'

import light from '../themes/theme-light.module.css'
import dark from '../themes/theme-dark.module.css'
import styles from './layout.module.css'

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
