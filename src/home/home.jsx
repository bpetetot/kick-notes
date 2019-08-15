import React from 'react'

import { useAuth } from '../auth'
import { useNetwork } from '../helpers/network'
import { getFS, getEmitter, getRepoUrl, CORS_PROXY } from '../git'
import { clone, utils } from 'isomorphic-git'
import { useStorage } from '../helpers/storage'

import styles from './home.module.css'

const Home = () => {
  const { user, isAuthenticated, login, logout } = useAuth()
  const { isOnline } = useNetwork()
  const [token] = useStorage('token')

  const testApi = async () => {
    console.log('test api')
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `token ${token}`,
      },
    }

    const resp = await fetch(
      `https://api.github.com/user/repos?affiliation=owner&visibility=private&sort=created`,
      options
    )
    const data = await resp.json()
    console.log(data)
  }

  const testGit = async () => {
    console.log('test git')
    const dir = '/test2'

    try {
      await getFS().mkdir(dir)
    } catch (e) {
      console.log(e)
    }

    const onMessage = message => console.log(message)

    const onProgress = progress => console.log(progress)

    getEmitter().on('message', onMessage)
    getEmitter().on('progress', onProgress)

    console.log({ user, token })
    const credentials = utils.auth(user.username, token)
    await clone({
      ...credentials,
      dir,
      corsProxy: CORS_PROXY,
      url: getRepoUrl(),
      ref: 'master',
      singleBranch: true,
      depth: 1,
    })

    getEmitter().off('message', onMessage)
    getEmitter().off('progress', onProgress)

    const result = await getFS().readdir(dir)
    console.log(result)
  }

  return (
    <div className={styles.home}>
      <header>
        <h1>Kick notes</h1>
        <h3>{isOnline ? 'Online' : 'Offline'}</h3>
        {!isAuthenticated && <button onClick={login}>Login with github</button>}
        {isAuthenticated && <button onClick={logout}>Logout</button>}
      </header>
      {isAuthenticated && (
        <>
          <h2>{user.displayName}</h2>
          <button onClick={testGit}>Test GIT</button>
          <button onClick={testApi}>Test API</button>
          <p>
            <code>{JSON.stringify(user, null, 2)}</code>
          </p>
        </>
      )}
    </div>
  )
}

export default Home
