import React, { useState, useEffect } from 'react'
import { toHtml } from 'services/markdown'

const MarkdownPreview = ({ content, className }) => {
  const [html, setHtml] = useState()

  useEffect(() => {
    setHtml(toHtml(content))
  }, [content])

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  )
}

MarkdownPreview.defaultProps = {
  content: '',
}

export default MarkdownPreview
