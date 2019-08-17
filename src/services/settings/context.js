import React, { useState, useContext } from 'react'

export const SettingsContext = React.createContext()

const DEFAULT_SETTINGS = {
  editorMode: true,
}

export const useSettings = () => useContext(SettingsContext)

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  const setSetting = (key, value) => {
    setSettings({
      ...settings,
      [key]: value,
    })
  }

  return (
    <SettingsContext.Provider value={{ settings, setSetting }}>
      {children}
    </SettingsContext.Provider>
  )
}
