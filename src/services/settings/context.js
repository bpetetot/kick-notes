import React, { useState, useContext } from 'react'

import { useStorage } from 'services/storage'

export const SettingsContext = React.createContext()

const DEFAULT_SETTINGS = {
  editorMode: true,
  editorToolbar: true,
  editorSpellCheck: false,
}

export const useSettings = () => useContext(SettingsContext)

export const SettingsProvider = ({ children }) => {
  const [storedSettings, saveSettings] = useStorage('settings')

  const defaultSettings = storedSettings
    ? {
        ...DEFAULT_SETTINGS,
        ...JSON.parse(storedSettings),
      }
    : DEFAULT_SETTINGS

  const [settings, setSettings] = useState(defaultSettings)

  const setSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    saveSettings(JSON.stringify(newSettings))
  }

  return (
    <SettingsContext.Provider value={{ settings, setSetting }}>
      {children}
    </SettingsContext.Provider>
  )
}
