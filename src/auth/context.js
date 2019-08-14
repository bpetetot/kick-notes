import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'

import { auth0Config, auth0ApiBody, getTokenUrl, getUserUrl } from './config'

const redirectAfterLogin = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl ? appState.targetUrl : '/'
  )
}

export const Auth0Context = React.createContext()

export const useAuth0 = () => useContext(Auth0Context)

export const Auth0Provider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [auth0Client, setAuth0] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0 = await createAuth0Client(auth0Config)
      setAuth0(auth0)

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0.handleRedirectCallback()
        redirectAfterLogin(appState)
      }

      const isAuthenticated = await auth0.isAuthenticated()

      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        const user = await auth0.getUser()

        // Get Auth0 API management token
        const tokenResponse = await fetch(getTokenUrl(), {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(auth0ApiBody),
        })
        const tokenJson = await tokenResponse.text()
        const { access_token } = JSON.parse(tokenJson)

        // Call API management to get User Provider Info
        const userResponse = await fetch(getUserUrl(user.sub), {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        })
        const userData = await userResponse.json()

        setUser(userData)
      }

      setLoading(false)
    }
    initAuth0()
  }, [])

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login: () => auth0Client.loginWithRedirect(),
        logout: () => auth0Client.logout(),
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
