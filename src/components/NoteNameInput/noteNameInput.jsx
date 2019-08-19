import React, { useState, useRef, useEffect } from 'react'

import { useRouter } from 'services/router'
import { rename } from 'services/notebook'

const NoteNameInput = ({ note, onChange, className }) => {
  const { isNew } = useRouter()

  const [name, setName] = useState(note.name)
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
  }

  const onRenameNote = async () => {
    if (name === note.name) return
    await rename(note, name, onChange)
  }

  return (
    <input
      className={className}
      ref={inputEl}
      type="text"
      value={name || ''}
      onFocus={onFocusName}
      onChange={onChangeName}
      onBlur={onRenameNote}
      autoFocus={isNew}
    />
  )
}

export default NoteNameInput
