import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import ArrowUpIcon from 'react-feather/dist/icons/arrow-up'
import AddIcon from 'react-feather/dist/icons/plus'
import NotebookIcon from 'react-feather/dist/icons/layers'
import NoteIcon from 'react-feather/dist/icons/file'
import DeleteNotebookIcon from 'react-feather/dist/icons/trash'

import { useNotebook, deleteNotebook, rename } from 'services/notebook'
import { getQueryParam } from 'services/router'
import { useDeviceDetect } from 'services/device'
import { useSider } from 'components/Sider'
import IconLabel from 'components/IconLabel'

import styles from './notesExplorer.module.css'

const NotesExplorer = ({ className, location, history }) => {
  const { currentNotebook, notes } = useNotebook()
  const [name, setName] = useState()
  const { isMobile } = useDeviceDetect()
  const { toggle } = useSider()

  const closeSidebarOnMobile = isMobile ? toggle : undefined

  const currentPath = getQueryParam(location, 'path')

  useEffect(() => {
    if (currentNotebook) {
      setName(currentNotebook.file)
    }
  }, [currentNotebook])

  const onClickDeleteNotebook = async () => {
    await deleteNotebook(currentNotebook)
    history.push({
      pathname: '/note',
      search: `?path=${currentNotebook.parent}`,
    })
  }

  const onChangeName = event => {
    const newName = event.target.value
    setName(newName)
  }

  const onRenameNotebook = async () => {
    if (name === currentNotebook.file) return
    await rename(currentNotebook, name, newNotebook => {
      history.push({
        pathname: '/note',
        search: `?path=${newNotebook.path}`,
      })
    })
  }

  return (
    <div className={cn(styles.explorer, className)}>
      <div className={styles.infobar}>
        <div className={styles.name}>
          {currentNotebook && currentNotebook.level > 0 ? (
            <input
              type="text"
              value={name || ''}
              onChange={onChangeName}
              onBlur={onRenameNotebook}
            />
          ) : (
            <div className={cn(styles.name, styles.root)}>All notebooks</div>
          )}
        </div>
        <div className={styles.actions}>
          {currentNotebook && currentNotebook.level > 0 && (
            <Link
              to={{
                pathname: '/note',
                search: `?path=${currentNotebook.parent}`,
              }}
            >
              <ArrowUpIcon size={16} />
            </Link>
          )}
          {currentNotebook && currentNotebook.level > 0 && (
            <DeleteNotebookIcon
              size={16}
              className="link"
              onClick={onClickDeleteNotebook}
            />
          )}
          {currentNotebook && (
            <Link
              to={{
                pathname: '/note',
                search: `?path=${currentNotebook.path}`,
              }}
              onClick={closeSidebarOnMobile}
            >
              <AddIcon size={16} />
            </Link>
          )}
        </div>
      </div>
      <ul className={styles.list}>
        {notes.map(item => (
          <li
            key={item.file}
            className={cn(styles.item, {
              [styles.selected]: currentPath === item.path,
            })}
          >
            <Link
              to={{ pathname: '/note', search: `?path=${item.path}` }}
              onClick={item.isNote ? closeSidebarOnMobile : undefined}
            >
              <IconLabel
                icon={item.isNotebook ? NotebookIcon : NoteIcon}
                size={16}
              >
                {item.name}
              </IconLabel>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default withRouter(NotesExplorer)
