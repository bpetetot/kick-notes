import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'

import { useDeviceDetect } from 'services/device'

import { getQueryParam, buildQueryString } from './services'

const NavigationContext = React.createContext()

export const useNavigation = () => useContext(NavigationContext)

const NavigationProvider = ({ children, location, history }) => {
  const { isMobile } = useDeviceDetect()
  const path = getQueryParam(location, 'path')
  const isNew = Boolean(getQueryParam(location, 'new'))

  const toNote = (note, { explore, parent, ...params } = {}) => {
    let pathname
    if (explore && isMobile) {
      pathname = '/explore'
    } else if (note.isNote && !parent) {
      pathname = '/note'
    } else {
      pathname = '/notebook'
    }
    return {
      pathname,
      search: buildQueryString({
        path: parent ? note.parent : note.path,
        ...(params || {}),
      }),
    }
  }

  const goToNote = (note, { replace, ...options } = {}) => {
    if (replace) {
      history.replace(toNote(note, options))
    } else {
      history.push(toNote(note, options))
    }
  }

  return (
    <NavigationContext.Provider
      value={{
        path,
        isNew,
        toNote,
        goToNote,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export default withRouter(NavigationProvider)
