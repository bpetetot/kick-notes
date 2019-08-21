// Documentation
// https://isomorphic-git.org/docs/en/browser
import { plugins } from 'isomorphic-git'

import { lightningFS } from '../fs'

let emitter

export const getEmitter = () => emitter

export const initialize = () => {
  // Initialize isomorphic-git with a file system
  plugins.set('fs', lightningFS)
}
