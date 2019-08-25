import Prism from 'prismjs'
import marked from 'marked'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  breaks: true,
  sanitize: true,
  smartLists: true,
  smartypants: true,
  highlight: (code, lang = 'language') => {
    const language = Prism.languages[lang]
    if (language) {
      return Prism.highlight(code, Prism.languages[lang], lang)
    }
    return code
  },
})

export const toHtml = marked
