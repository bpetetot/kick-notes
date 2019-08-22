import React from 'react'
import marked from 'marked'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  breaks: true,
  sanitize: true,
  smartLists: true,
  smartypants: true,
})

const MarkdownPreview = ({ content, className }) => {
  if (!content) return null

  const html = marked(content)
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  )
}

export default MarkdownPreview
