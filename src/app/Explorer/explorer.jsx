import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import NotebookIcon from 'react-feather/dist/icons/layers'
import NoteIcon from 'react-feather/dist/icons/file'

import { useNotebook } from 'services/notebook'
import { useRouter } from 'services/router'
import IconLabel from 'components/IconLabel'

import styles from './explorer.module.css'

const NotesExplorer = ({ className }) => {
  const { notes } = useNotebook()
  const { path, toNote } = useRouter()

  return (
    <ul className={cn(styles.explorer, className)}>
      {notes.map(item => (
        <Link key={item.file} to={toNote(item, { explore: item.isNotebook })}>
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
