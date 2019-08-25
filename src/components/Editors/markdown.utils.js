const getLineAtPos = (pos, lines) => {
  let startLinePos = 0
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const endLinePos = startLinePos + line.length
    if (startLinePos <= pos && pos <= endLinePos) {
      return {
        number: i + 1,
        content: line,
        start: startLinePos,
        end: endLinePos,
        caret: pos - startLinePos,
      }
    }
    startLinePos = endLinePos + 1
  }
  return null
}

const getWordAtPos = (pos, lines) => {
  const line = getLineAtPos(pos, lines)
  const caretPos = line.caret
  const words = line.content.split(' ')
  let startWordPos = 0
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const endWordPos = startWordPos + word.length
    if (startWordPos <= caretPos && caretPos <= endWordPos) {
      return {
        content: word,
        start: line.start + startWordPos,
        end: line.start + endWordPos,
      }
    }
    startWordPos = endWordPos + 1
  }
  return null
}

const applyChange = (
  textarea,
  posStart,
  posEnd,
  content,
  charStart,
  charEnd
) => {
  const newContent = charStart + content + charEnd
  textarea.setSelectionRange(posStart, posEnd)
  textarea.focus()
  document.execCommand('insertText', false, newContent)
  textarea.setSelectionRange(
    posStart + charStart.length,
    posEnd + charStart.length
  )
  textarea.focus()
}

export const applyAction = (textarea, { chars = [], charsBlock = [] } = {}) => {
  const { value, selectionStart, selectionEnd } = textarea
  const selection = window.getSelection()
  const lines = value.split('\n')

  let [charStart, charEnd] = chars

  const multiline = selection.toString().split('\n').length > 1
  if (multiline && charsBlock) {
    charStart = charsBlock[0]
    charEnd = charsBlock[1]
  }

  if (selection.type === 'Caret') {
    const word = getWordAtPos(selectionStart, lines)
    applyChange(
      textarea,
      word.start,
      word.end,
      word.content,
      charStart,
      charEnd
    )
  } else {
    applyChange(
      textarea,
      selectionStart,
      selectionEnd,
      selection.toString(),
      charStart,
      charEnd
    )
  }
}
