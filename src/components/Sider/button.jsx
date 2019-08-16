import React from 'react'

import MenuIcon from 'react-feather/dist/icons/menu'
import ArrowLeftIcon from 'react-feather/dist/icons/arrow-left'
import { useSider } from './context'

const SiderButton = () => {
  const { isOpen, toggle } = useSider()

  if (isOpen) {
    return <ArrowLeftIcon onClick={toggle} style={{ cursor: 'pointer' }} />
  }
  return <MenuIcon onClick={toggle} style={{ cursor: 'pointer' }} />
}

export default SiderButton
