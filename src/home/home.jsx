import React from 'react'

import { useAuth0 } from '../auth'
import { useNetwork } from '../network'
import { getFS, getEmitter, getRepoUrl, CORS_PROXY } from '../git'
import { clone, utils } from 'isomorphic-git'

import styles from './home.module.css'

const Home = () => {
  const { user, isAuthenticated, logout } = useAuth0()
  const { isOnline } = useNetwork()

  const testApi = async () => {
    console.log('test api')
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `token ${user.identities[0].access_token}`,
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

    const credentials = utils.auth(
      user.nickname,
      user.identities[0].access_token
    )

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
        {isAuthenticated && <button onClick={logout}>Logout</button>}
      </header>
      <h2>{user.name}</h2>
      <button onClick={testGit}>Test GIT</button>
      <button onClick={testApi}>Test API</button>
      <p>
        <code>{JSON.stringify(user, null, 2)}</code>
      </p>
    </div>
  )
}

export default Home
