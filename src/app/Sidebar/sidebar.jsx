import React from 'react'
import cn from 'classnames'

import { useSettings } from 'services/settings'
import Logout from 'components/Logout'
import Switch from 'components/Switch'

import NotesExplorer from '../NotesExplorer'
import styles from './sidebar.module.css'

const Sidebar = ({ className }) => {
  const { settings, setSetting } = useSettings()

  const setEditorMode = value => setSetting('editorMode', value)

  return (
    <div className={cn(styles.sidebar, className)}>
      <NotesExplorer />
      <div className={styles.actions}>
        <label htmlFor="editorMode">
          <Switch
            name="editorMode"
            label="Editor mode"
            defaultChecked={settings.editorMode}
            onChange={setEditorMode}
          />
        </label>
        <Logout />
      </div>
    </div>
  )
}

export default Sidebar
