import LightningFS from '@isomorphic-git/lightning-fs'

// initialize filesystem
export const lightningFS = new LightningFS('fs')

export * from './fs'
export * from './config'

export default lightningFS.promises
