/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import throttle from 'lodash/throttle'

const DELAY = 200

const MOBILE = 550
const TABLET = 750
const DESKTOP = 1000

export const useDeviceDetect = () => {
  const isClient = typeof window === 'object'

  const getSize = () => {
    return isClient ? window.innerWidth : undefined
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    const handleResize = () => setWindowSize(getSize())
    const throttleHandleResize = throttle(handleResize, DELAY)

    window.addEventListener('resize', throttleHandleResize)
    return () => {
      throttleHandleResize.cancel()
      window.removeEventListener('resize', throttleHandleResize)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return {
    isMobile: windowSize < MOBILE,
    isTablet: windowSize >= MOBILE && windowSize < TABLET,
    isDesktop: windowSize >= DESKTOP,
  }
}
