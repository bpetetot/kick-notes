import LightningFS from '@isomorphic-git/lightning-fs'

const FS_DB = 'fs'

// initialize filesystem
export const lightningFS = new LightningFS(FS_DB)

export const deleteFSDatabase = async () => {
  window.indexedDB.deleteDatabase(FS_DB)
  window.indexedDB.deleteDatabase(`${FS_DB}_lock`)
}

export * from './fs'
export * from './config'

export default lightningFS.promises
