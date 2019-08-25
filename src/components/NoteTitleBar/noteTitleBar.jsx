import React from 'react'
import MaximizeIcon from 'react-feather/dist/icons/maximize-2'
import MinimizeIcon from 'react-feather/dist/icons/minimize-2'
import PreviewIcon from 'react-feather/dist/icons/eye'
import EditorIcon from 'react-feather/dist/icons/edit'

import { useNavigation } from 'services/navigation'
import { useDeviceDetect } from 'services/device'
import { useFullscreen } from 'services/fullscreen'
import { useSettings } from 'services/settings'
import NoteNameInput from 'components/NoteNameInput'

import styles from './noteTitleBar.module.css'

const NoteTitleBar = ({ note }) => {
  const { goToNote } = useNavigation()
  const { isMobile } = useDeviceDetect()
  const { settings, setSetting } = useSettings()
  const { fullscreen, toggleFullscreen } = useFullscreen()

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
          <button type="button" onClick={toggleEditor} className="icon link">
            {settings.editorMode ? (
              <PreviewIcon size={20} />
            ) : (
              <EditorIcon size={20} />
            )}
          </button>
        )}
        {!isMobile && (
          <button
            type="button"
            onClick={toggleFullscreen}
            className="icon link"
          >
            {fullscreen ? (
              <MinimizeIcon size={20} />
            ) : (
              <MaximizeIcon size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default NoteTitleBar
