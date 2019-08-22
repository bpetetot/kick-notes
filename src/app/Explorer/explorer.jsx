import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import NotebookIcon from 'react-feather/dist/icons/layers'
import NoteIcon from 'react-feather/dist/icons/file'

import { useNotebook } from 'services/notebook'
import { useRouter } from 'services/router'
import { useDeviceDetect } from 'services/device'
import { useSettings } from 'services/settings'
import { useSider } from 'components/Sider'
import Logout from 'components/Logout'
import IconLabel from 'components/IconLabel'
import Switch from 'components/Switch'

import styles from './explorer.module.css'

const NotesExplorer = ({ className }) => {
  const { isMobile } = useDeviceDetect()
  const { toggle } = useSider()
  const { notes } = useNotebook()
  const { path, buildNoteRoute } = useRouter()
  const { settings, setSetting } = useSettings()

  const setEditorMode = value => setSetting('editorMode', value)

  return (
    <div className={cn(styles.sidebar, className)}>
      <div className={cn(styles.explorer, className)}>
        <ul className={styles.list}>
          {notes.map(item => (
            <Link
              key={item.file}
              to={buildNoteRoute({ path: item.path })}
              onClick={item.isNote && isMobile ? toggle : undefined}
            >
              <li
                className={cn(styles.item, {
                  [styles.selected]: path === item.path,
                })}
              >
                <IconLabel
                  icon={item.isNotebook ? NotebookIcon : NoteIcon}
                  size={16}
                >
                  {item.name}
                </IconLabel>
              </li>
            </Link>
          ))}
        </ul>
      </div>
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

export default NotesExplorer
