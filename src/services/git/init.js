// Documentation
// https://isomorphic-git.org/docs/en/browser
import { plugins } from 'isomorphic-git'
import EventEmitter from 'events'

import { lightningFS } from '../fs'

let emitter

export const getEmitter = () => emitter

export const initialize = () => {
  // Initialize isomorphic-git with a file system
  plugins.set('fs', lightningFS)

  // Initialize isomorphic-git with an event emitter
  emitter = new EventEmitter()
  plugins.set('emitter', emitter)
}
