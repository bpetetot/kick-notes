import React from 'react'

import MenuIcon from 'react-feather/dist/icons/menu'
import ArrowLeftIcon from 'react-feather/dist/icons/arrow-left'
import { useSider } from './context'

const SiderButton = () => {
  const { isOpen, toggle } = useSider()

  return (
    <button onClick={toggle} className="link">
      {isOpen ? (
        <ArrowLeftIcon onClick={toggle} />
      ) : (
        <MenuIcon onClick={toggle} />
      )}
    </button>
  )
}

export default SiderButton
