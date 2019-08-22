import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import NotebookIcon from 'react-feather/dist/icons/layers'
import NoteIcon from 'react-feather/dist/icons/file'

import { useNotebook } from 'services/notebook'
import { useRouter } from 'services/router'
import { useDeviceDetect } from 'services/device'
import { useSider } from 'components/Sider'
import IconLabel from 'components/IconLabel'

import styles from './explorer.module.css'

const NotesExplorer = ({ className }) => {
  const { isMobile } = useDeviceDetect()
  const { toggle } = useSider()
  const { notes } = useNotebook()
  const { path, toNote } = useRouter()

  return (
    <ul className={cn(styles.explorer, className)}>
      {notes.map(item => (
        <Link
          key={item.file}
          to={toNote(item)}
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
  )
}

export default NotesExplorer
