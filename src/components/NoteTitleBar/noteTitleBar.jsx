import React from 'react'
import MaximizeIcon from 'react-feather/dist/icons/maximize-2'
import MinimizeIcon from 'react-feather/dist/icons/minimize-2'

import { useRouter } from 'services/router'
import { useDeviceDetect } from 'services/device'
import NoteNameInput from 'components/NoteNameInput'
import { useSider } from 'components/Sider/context'

import styles from './noteTitleBar.module.css'

const NoteTitleBar = ({ note }) => {
  const { goToNote } = useRouter()
  const { isOpen, toggle } = useSider()
  const { isMobile } = useDeviceDetect()

  if (!note) return null

  return (
    <div className={styles.infobar}>
      <div className={styles.name}>
        {(note.isNote || note.level > 0) && (
          <NoteNameInput note={note} onChange={goToNote} />
        )}
        {note.isNotebook && note.level === 0 && <h1>Kick Notes</h1>}
      </div>
      <div className={styles.actions}>
        {!isMobile && (
          <button onClick={toggle} className="link">
            {isOpen ? <MaximizeIcon size={20} /> : <MinimizeIcon size={20} />}
          </button>
        )}
      </div>
    </div>
  )
}

export default NoteTitleBar
