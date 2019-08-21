import firebase from 'firebase/app'

import React, { useState, useEffect, useContext } from 'react'
import { useStorage } from 'services/storage'
import { useNetwork } from 'services/network'

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useStorage('token')
  const { isOnline } = useNetwork()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        // User is signed in.
        const { credential } = await firebase.auth().getRedirectResult()
        if (credential) {
          setToken(credential.accessToken)
        }

        // Call GitHub API to get user info
        let username
        const accessToken = (credential && credential.accessToken) || token
        if (accessToken && isOnline) {
          const resp = await fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              Authorization: `token ${accessToken}`,
            },
          })
          const data = await resp.json()
          username = data.login
        }

        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          username,
          token: accessToken,
        })
        setIsAuthenticated(true)
      } else {
        setToken(null)
        setUser(null)
        setIsAuthenticated(false)
      }
      setLoading(false)
    })
  }, []) // eslint-disable-line

  const login = async () => {
    const provider = new firebase.auth.GithubAuthProvider()
    provider.addScope('repo')
    await firebase.auth().signInWithRedirect(provider)
  }

  const logout = async () => {
    await firebase.auth().signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
