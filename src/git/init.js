// Documentation
// https://isomorphic-git.org/docs/en/browser
import LightningFS from '@isomorphic-git/lightning-fs'
import { plugins } from 'isomorphic-git'
import EventEmitter from 'events'

let fs
let emitter

export const getFS = () => fs.promises

export const getEmitter = () => emitter

export const initialize = () => {
  // Initialize isomorphic-git with a file system
  fs = new LightningFS('fs')
  plugins.set('fs', fs)

  // Initialize isomorphic-git with an event emitter
  emitter = new EventEmitter()
  plugins.set('emitter', emitter)
}
