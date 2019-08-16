import React, { useContext, useState } from 'react'

const SiderContext = React.createContext()

export const useSider = () => useContext(SiderContext)

export const SiderProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(true)

  const toggle = async () => {
    setOpen(!isOpen)
  }

  return (
    <SiderContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SiderContext.Provider>
  )
}
