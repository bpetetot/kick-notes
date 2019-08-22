import React, { useContext, useState } from 'react'

const SiderContext = React.createContext()

export const useSider = () => useContext(SiderContext)

export const SiderProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(true)

  const toggle = () => {
    setOpen(!isOpen)
  }

  const open = () => {
    if (!isOpen) setOpen(true)
  }

  const close = () => {
    if (isOpen) setOpen(false)
  }

  return (
    <SiderContext.Provider value={{ isOpen, toggle, open, close }}>
      {children}
    </SiderContext.Provider>
  )
}
