import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import ArrowUpIcon from 'react-feather/dist/icons/arrow-up'
import AddIcon from 'react-feather/dist/icons/plus'
import NotebookIcon from 'react-feather/dist/icons/layers'
import NoteIcon from 'react-feather/dist/icons/file'
import DeleteNotebookIcon from 'react-feather/dist/icons/trash'

import { useNotebook, deleteNotebook } from 'services/notebook'
import { getQueryParam } from 'services/router'
import { useDeviceDetect } from 'services/device'
import { useSider } from 'components/Sider'
import IconLabel from 'components/IconLabel'

import styles from './notesExplorer.module.css'

const NotesExplorer = ({ className, location, history }) => {
  const { currentNotebook, notes } = useNotebook()
  const { isMobile } = useDeviceDetect()
  const { toggle } = useSider()

  const closeSidebarOnMobile = isMobile ? toggle : undefined

  const currentPath = getQueryParam(location, 'path')

  const onClickDeleteNotebook = async () => {
    await deleteNotebook(currentNotebook)
    history.push({
      pathname: '/note',
      search: `?path=${currentNotebook.parent}`,
    })
  }

  return (
    <div className={cn(styles.explorer, className)}>
      <div className={styles.infobar}>
        <div>{currentNotebook && currentNotebook.file}</div>
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
