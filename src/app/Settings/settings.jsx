import React from 'react'

import { deleteFSDatabase } from 'services/fs'
import { useAuth } from 'services/auth'
import { getRepoUrl } from 'services/git'
import { useSettings } from 'services/settings'
import Switch from 'components/Switch'

import styles from './settings.module.css'

const Settings = () => {
  const { user, logout } = useAuth()
  const { settings, setSetting } = useSettings()

  const handleLogout = () => {
    deleteFSDatabase()
    logout()
  }

  return (
    <div className={styles.settings}>
      <section>
        <div className={styles.title}>GitHub account</div>
        <div className={styles.account}>
          <img src={user.photoURL} alt="avatar" />
          <div className={styles.accountInfo}>
            <div>
              <div className={styles.name}>{user.displayName}</div>
              <div className={styles.email}>{user.email}</div>
            </div>
            <button className="link" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.title}>Git repository</div>
        <input type="text" defaultValue={getRepoUrl()} disabled />
      </section>

      <section>
        <div className={styles.title}>Dark mode</div>
        <Switch
          name="darkMode"
          label="Enable dark mode"
          defaultChecked={settings.darkMode}
          onChange={checked => setSetting('darkMode', checked)}
        />
      </section>

      <section>
        <div className={styles.title}>Markdown editor</div>
        <Switch
          name="editorToolbar"
          label="Display toolbar"
          defaultChecked={settings.editorToolbar}
          onChange={checked => setSetting('editorToolbar', checked)}
        />
        <Switch
          name="editorSpellCheck"
          label="Enable spell check"
          defaultChecked={settings.editorSpellCheck}
          onChange={checked => setSetting('editorSpellCheck', checked)}
        />
      </section>
    </div>
  )
}

export default Settings
