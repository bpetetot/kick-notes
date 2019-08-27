// get the line info at the given caret position
const getLineAtPos = (pos, lines = []) => {
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

// get the word info at the given caret position
const getWordAtPos = (pos, lines = []) => {
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

// Apply changes
const applyChanges = (textarea, { content, position, selection }) => {
  textarea.setSelectionRange(position.start, position.end)
  textarea.focus()
  document.execCommand('insertText', false, content)
  textarea.setSelectionRange(selection.start, selection.end)
  textarea.focus()
}

export const applyAction = (textarea, { chars, charsBlock } = {}) => {
  const { value, selectionStart, selectionEnd } = textarea
  const selection = window.getSelection()
  const lines = value.split('\n')

  // default charStart and charEnd
  let [charStart, charEnd] = chars

  // use charsBlock when severals lines are selected
  const isBlock = selection.toString().split('\n').length > 1
  if (isBlock && charsBlock) {
    charStart = charsBlock[0]
    charEnd = charsBlock[1]
  }

  let changes

  if (charStart && !charEnd) {
    // When only charStart, apply changes to the begining of the first line
    const firstLine = getLineAtPos(selectionStart, lines)
    changes = {
      content: charStart,
      position: {
        start: firstLine.start,
        end: firstLine.start,
      },
      selection: {
        start: selectionStart + charStart.length,
        end: selectionEnd + charStart.length,
      },
    }
  } else if (selection.type === 'Range') {
    // When there is a selection apply changes to the selection
    changes = {
      content: charStart + selection.toString() + charEnd,
      position: {
        start: selectionStart,
        end: selectionEnd,
      },
      selection: {
        start: selectionStart + charStart.length,
        end: selectionEnd + charStart.length,
      },
    }
  } else if (selection.type === 'Caret') {
    // When nothing selected, apply changes to the word where the caret is positioned
    const word = getWordAtPos(selectionStart, lines)
    changes = {
      content: charStart + word.content + charEnd,
      position: {
        start: word.start,
        end: word.end,
      },
      selection: {
        start: selectionStart + charStart.length,
        end: selectionEnd + charStart.length,
      },
    }
  }

  applyChanges(textarea, changes)
}

const isMac = window.navigator.platform.match('Mac')

export const listenActionsKey = (event, textarea, actions) => {
  actions.forEach(({ key, ...action }) => {
    const ctrlPressed = isMac ? !!event.metaKey : !!event.ctrlKey
    const keyPressed = event.key === key
    if (ctrlPressed && keyPressed) {
      applyAction(textarea, action)
    }
  })
}
