import React, { useRef, useEffect } from 'react'

import { applyAction, listenActionsKey } from './markdown.utils'
import actions from './markdown.actions'

import styles from './markdown.module.css'

const MarkdownEditor = ({ note, onChange, onBlur, toolbar, spellCheck }) => {
  const editor = useRef()

  useEffect(() => {
    editor.current.value = note.content
  }, [note])

  const handleChange = e => {
    onChange(e.target.value)
  }

  const handleBlur = e => {
    if (e.relatedTarget && e.relatedTarget.name === 'editor-action') {
      return
    }
    onBlur()
  }

  return (
    <div className={styles.editor}>
      {toolbar && (
        <div className={styles.actionbar}>
          {actions.map(({ name, icon: Icon, ...action }) => (
            <button
              key={name}
              type="button"
              name="editor-action"
              className="icon link"
              onClick={() => applyAction(editor.current, action)}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      )}

      <textarea
        ref={editor}
        defaultValue={note.content}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.content}
        placeholder="Start to write here."
        spellCheck={spellCheck}
        onKeyPress={event => listenActionsKey(event, editor.current, actions)}
      />
    </div>
  )
}
export default MarkdownEditor
