import React, { useState, useRef, useEffect } from 'react'
import cn from 'classnames'

import { useNavigation } from 'services/navigation'
import { rename } from 'services/notebook'
import { isValidFilename } from 'services/fs'
import { useGit } from 'services/git'

import styles from './noteNameInput.module.css'

const NoteNameInput = ({ note, onChange, className }) => {
  const { isNew } = useNavigation()
  const { commitAndPush } = useGit()

  const [name, setName] = useState(note.name)
  const [error, setError] = useState()
  const inputEl = useRef()

  useEffect(() => {
    setName(note.name)
    if (inputEl && inputEl.current && isNew) {
      inputEl.current.select()
    }
  }, [note, isNew])

  const onFocusName = () => {
    if (inputEl && inputEl.current) inputEl.current.select()
  }

  const onChangeName = event => {
    const newName = event.target.value
    setName(newName)
    setError(!isValidFilename(newName))
  }

  const onRenameNote = async () => {
    if (name === note.name) return
    if (isValidFilename(name)) {
      await rename(note, name, onChange)
      commitAndPush(`Rename "${note.name}" to "${name}"`)
    } else {
      setName(note.name)
      setError(false)
    }
  }

  const onKeyPress = event => {
    if (event.key === 'Enter') {
      onRenameNote()
    }
  }

  return (
    <input
      className={cn(className, styles.input, { [styles.error]: error })}
      ref={inputEl}
      type="text"
      value={name || ''}
      onFocus={onFocusName}
      onChange={onChangeName}
      onBlur={onRenameNote}
      onKeyPress={onKeyPress}
      autoFocus={isNew}
      spellCheck="false"
    />
  )
}

export default NoteNameInput
