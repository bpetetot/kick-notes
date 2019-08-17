import { clone, pull, utils } from 'isomorphic-git'

import { getRepoUrl, CORS_PROXY, ROOT_FOLDER } from './config'
import { getFS, getEmitter } from './init'
import { existsFolder } from './fs'

const getCredentials = user => utils.auth(user.username, user.token)

export const fetchRepo = async (user, onProgress) => {
  if (onProgress) getEmitter().on('progress', onProgress)

  const exists = await existsFolder(ROOT_FOLDER)
  if (exists) {
    await pullRepo(user)
  } else {
    await getFS().mkdir(ROOT_FOLDER)
    await cloneRepo(user)
  }

  if (onProgress) getEmitter().off('progress', onProgress)
}

const pullRepo = user => {
  return pull({
    ...getCredentials(user),
    dir: ROOT_FOLDER,
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
    dir: ROOT_FOLDER,
    corsProxy: CORS_PROXY,
    url: getRepoUrl(),
    ref: 'master',
    singleBranch: true,
    depth: 1,
  })
}
