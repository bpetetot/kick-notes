import React, { useContext, useState } from 'react'

const FullscreenContext = React.createContext()

export const useFullscreen = () => useContext(FullscreenContext)

export const FullscreenProvider = ({ children }) => {
  const [fullscreen, setFullscreen] = useState(false)

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen)
  }

  return (
    <FullscreenContext.Provider value={{ fullscreen, toggleFullscreen }}>
      {children}
    </FullscreenContext.Provider>
  )
}
