import React from 'react'
import MaximizeIcon from 'react-feather/dist/icons/maximize-2'
import MinimizeIcon from 'react-feather/dist/icons/minimize-2'
import PreviewIcon from 'react-feather/dist/icons/eye'
import EditorIcon from 'react-feather/dist/icons/edit'

import { useRouter } from 'services/router'
import { useDeviceDetect } from 'services/device'
import { useSettings } from 'services/settings'
import NoteNameInput from 'components/NoteNameInput'
import { useSider } from 'components/Sider/context'

import styles from './noteTitleBar.module.css'

const NoteTitleBar = ({ note }) => {
  const { goToNote } = useRouter()
  const { isOpen, toggle } = useSider()
  const { isMobile } = useDeviceDetect()
  const { settings, setSetting } = useSettings()

  if (!note) return null

  const toggleEditor = () => setSetting('editorMode', !settings.editorMode)

  return (
    <div className={styles.infobar}>
      <div className={styles.name}>
        {(note.isNote || note.level > 0) && (
          <NoteNameInput note={note} onChange={goToNote} />
        )}
        {note.isNotebook && note.level === 0 && (
          <div className={styles.title}>Kick Notes</div>
        )}
      </div>
      <div className={styles.actions}>
        {note.isNote && (
          <button onClick={toggleEditor} className="icon link">
            {settings.editorMode ? (
              <PreviewIcon size={20} />
            ) : (
              <EditorIcon size={20} />
            )}
          </button>
        )}
        {!isMobile && (
          <button onClick={toggle} className="icon link">
            {isOpen ? <MaximizeIcon size={20} /> : <MinimizeIcon size={20} />}
          </button>
        )}
      </div>
    </div>
  )
}

export default NoteTitleBar
