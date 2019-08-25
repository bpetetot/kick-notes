import React, { useRef, useEffect } from 'react'

import TitleIcon from 'react-feather/dist/icons/type'
import BoldIcon from 'react-feather/dist/icons/bold'
import ItalicIcon from 'react-feather/dist/icons/italic'
import QuoteIcon from 'react-feather/dist/icons/message-circle'
import CodeIcon from 'react-feather/dist/icons/code'
import LinkIcon from 'react-feather/dist/icons/link-2'
import Listcon from 'react-feather/dist/icons/list'
import HashIcon from 'react-feather/dist/icons/hash'

import { applyAction } from './markdown.utils'

import styles from './markdown.module.css'

const MarkdownEditor = ({ note, onChange, onBlur, toolbar, spellCheck }) => {
  const editor = useRef()

  useEffect(() => {
    editor.current.value = note.content
  }, [note])

  const apply = chars => e => {
    applyAction(editor.current, ...chars)
  }

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
          <button
            name="editor-action"
            className="icon link"
            onClick={apply(['### '])}
          >
            <TitleIcon size={16} />
          </button>
          <button
            name="editor-action"
            className="icon link"
            onClick={apply(['**', '**'])}
          >
            <BoldIcon size={16} />
          </button>
          <button
            name="editor-action"
            className="icon link"
            onClick={apply(['_', '_'])}
          >
            <ItalicIcon size={16} />
          </button>
          <div className={styles.separator} />
          <button
            name="editor-action"
            className="icon link"
            onClick={apply(['\n\n> '])}
          >
            <QuoteIcon size={16} />
          </button>
          <button
            name="editor-action"
            className="icon link"
            onClick={apply(['`', '`'])}
          >
            <CodeIcon size={16} />
          </button>
          <button
            name="editor-action"
            className="icon link"
            onClick={apply(['\n```\n', '\n```\n'])}
          >
            <CodeIcon size={16} />
          </button>
          <button
            name="editor-action"
            className="icon link"
            onClick={apply(['[', '](url)'])}
          >
            <LinkIcon size={16} />
          </button>
          <div className={styles.separator} />
          <button
            name="editor-action"
            className="icon link"
            onClick={apply(['\n- '])}
          >
            <Listcon size={16} />
          </button>
          <button
            name="editor-action"
            className="icon link"
            onClick={apply(['\n1. '])}
          >
            <HashIcon size={16} />
          </button>
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
      />
    </div>
  )
}
export default MarkdownEditor
