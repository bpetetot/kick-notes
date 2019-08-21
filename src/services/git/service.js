import * as git from 'isomorphic-git'

import { getRepoUrl, CORS_PROXY } from './config'
import fs, { existsFolder, ROOT_FOLDER } from '../fs'

const WORKDIR = 2
const STAGE = 3
const MAX_DEPTH_COMMITS = 50

const getCredentials = user => git.utils.auth(user.username, user.token)

export const cloneOrPull = async user => {
  const exists = await existsFolder(ROOT_FOLDER)
  if (!exists) {
    console.log('Clone')
    await fs.mkdir(ROOT_FOLDER)

    await git.clone({
      ...getCredentials(user),
      dir: ROOT_FOLDER,
      corsProxy: CORS_PROXY,
      url: getRepoUrl(),
      ref: 'master',
      singleBranch: true,
      depth: MAX_DEPTH_COMMITS,
    })

    await git.config({
      dir: ROOT_FOLDER,
      path: 'user.name',
      value: user.displayName,
    })

    await git.config({
      dir: ROOT_FOLDER,
      path: 'user.email',
      value: user.email,
    })
  } else {
    await pull(user)
  }
}

export const commit = async message => {
  const unstaged = (await git.statusMatrix({
    dir: ROOT_FOLDER,
    pattern: '**',
  })).filter(row => row[WORKDIR] !== row[STAGE])

  if (unstaged.length === 0) return

  await Promise.all(
    unstaged.map(([filepath, , worktreeStatus]) =>
      worktreeStatus
        ? git.add({ dir: ROOT_FOLDER, filepath })
        : git.remove({ dir: ROOT_FOLDER, filepath })
    )
  )

  await git.commit({ dir: ROOT_FOLDER, message })

  console.log(`Commit: ${message}`)
}

export const pull = async user => {
  try {
    console.log('Pull')
    await git.pull({
      ...getCredentials(user),
      dir: ROOT_FOLDER,
      ref: 'master',
      singleBranch: true,
      depth: MAX_DEPTH_COMMITS,
    })
  } catch (e) {
    if (e.code === 'MergeNotSupportedFail') {
      console.log('Remote has commits, cant merge')
      // must ask if retreive (re-clone: lose local modif) or send (push force: lose remote modif)
      // can list diff between remote commit and local commit
    } else {
      console.error({ e })
    }
  }
}

export const push = async (user, force = false) => {
  try {
    console.log('Push')
    await git.push({
      ...getCredentials(user),
      dir: ROOT_FOLDER,
      ref: 'master',
      remoteRef: 'master',
      force,
    })
  } catch (e) {
    if (e.code === 'PushRejectedNonFastForward') {
      console.log('Remote has commits, cant merge')
    } else {
      console.error({ e })
    }
  }
}

export const fetch = async user => {
  try {
    await git.fetch({
      ...getCredentials(user),
      dir: ROOT_FOLDER,
      url: getRepoUrl(),
      ref: 'master',
      singleBranch: true,
      depth: MAX_DEPTH_COMMITS,
    })

    const commits = await git.log({
      dir: ROOT_FOLDER,
      depth: MAX_DEPTH_COMMITS,
    })
    console.log(commits)
  } catch (e) {
    console.error(e)
  }
}
