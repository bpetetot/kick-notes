import { clone, pull, utils } from 'isomorphic-git'

import { getRepoUrl, CORS_PROXY } from './config'
import { getFS, getEmitter } from './init'
import { existsFolder } from './fs'

const getCredentials = user => utils.auth(user.username, user.token)

export const getRepoFolder = user => `/${user.uid}`

export const fetchRepo = async (user, onProgress) => {
  if (onProgress) getEmitter().on('progress', onProgress)

  const repoFolder = getRepoFolder(user)
  const exists = await existsFolder(repoFolder)
  if (exists) {
    await pullRepo(user)
  } else {
    await getFS().mkdir(repoFolder)
    await cloneRepo(user)
  }

  if (onProgress) getEmitter().off('progress', onProgress)
}

const pullRepo = user => {
  return pull({
    ...getCredentials(user),
    dir: getRepoFolder(user),
    corsProxy: CORS_PROXY,
    url: getRepoUrl(),
    ref: 'master',
    singleBranch: true,
    fastForwardOnly: true,
    depth: 1,
  })
}

const cloneRepo = user => {
  return clone({
    ...getCredentials(user),
    dir: getRepoFolder(user),
    corsProxy: CORS_PROXY,
    url: getRepoUrl(),
    ref: 'master',
    singleBranch: true,
    depth: 1,
  })
}
