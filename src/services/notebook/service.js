import first from 'lodash/first'
import last from 'lodash/last'
import fs, {
  stat,
  generateFilename,
  generateFoldername,
  ROOT_FOLDER,
} from '../fs'

const DEFAULT_NOTEBOOK_NAME = 'New notebook'
const DEFAULT_NOTE_NAME = 'New note.md'

const DEFAULT_NOTEBOOK = {
  file: 'All notebooks',
  name: 'Kick notes',
  path: ROOT_FOLDER,
  level: 0,
  isNotebook: true,
}

const getInfoNote = async filepath => {
  const stats = await stat(filepath)
  if (!stats) return

  const pathArray = filepath.split('/')
  const file = pathArray.pop()
  return {
    file,
    path: filepath,
    name: first(file.split('.')),
    extension: last(file.split('.')),
    parent: pathArray.join('/'),
    isNote: stats.isFile(),
    isNotebook: stats.isDirectory(),
    isHidden: file.startsWith('.'),
    level: filepath.split('/').length - 2,
  }
}

export const listNotes = async filepath => {
  const filenames = await fs.readdir(filepath)

  const filesinfo = await Promise.all(
    filenames.map(async file => getInfoNote(`${filepath}/${file}`))
  )

  return filesinfo
    .filter(
      file => (file.isNotebook && !file.isHidden) || file.extension === 'md'
    )
    .sort((file1, file2) => {
      if (file1.isNotebook && file2.isNote) {
        return -1
      } else if (file1.isNote && file2.isNotebook) {
        return 1
      }
      return file1.name.localeCompare(file2.name)
    })
}

export const getNote = async filepath => {
  const info = await getInfoNote(filepath)
  if (!info || info.isNotebook) return
  const uint8array = await fs.readFile(filepath)
  const content = new TextDecoder('utf-8').decode(uint8array)

  return { ...info, content }
}

export const getNotebook = async filepath => {
  let info = await getInfoNote(filepath)

  if (!info) return DEFAULT_NOTEBOOK

  if (info.isNotebook) return info

  return getInfoNote(info.parent)
}

export const addNotebook = async parent => {
  if (!parent || !parent.isNotebook) return

  const folderpath = await generateFoldername(
    parent.path,
    DEFAULT_NOTEBOOK_NAME
  )
  await fs.mkdir(folderpath)

  return getInfoNote(folderpath)
}

export const addNote = async parent => {
  if (!parent || !parent.isNotebook) return

  const filepath = await generateFilename(parent.path, DEFAULT_NOTE_NAME)
  await fs.writeFile(filepath, '', { encoding: 'utf8' })

  return getInfoNote(filepath)
}

export const rename = async (note, newName, onRename) => {
  if (!note) return

  let newFilepath
  if (note.isNote) {
    newFilepath = `${note.parent}/${newName}.${note.extension}`
  } else {
    newFilepath = `${note.parent}/${newName}`
  }

  await fs.rename(note.path, newFilepath)

  const renamedNote = await getInfoNote(newFilepath)

  if (onRename) onRename(renamedNote)
}

export const updateNote = async (note, content, onUpdate) => {
  if (!note || note.isNotebook) return

  await fs.writeFile(note.path, content, { encoding: 'utf8' })

  if (onUpdate) onUpdate()
}

export const deleteNote = async note => {
  if (!note || note.isNotebook) return

  try {
    await fs.unlink(note.path)
  } catch (error) {
    console.log(error)
  }
}

/**
 * Delete notebook and its notes and notebooks recursivly (be carefull)
 * @param {Object} notebook
 */
export const deleteNotebook = async notebook => {
  if (!notebook || !notebook.isNotebook) return

  const filenames = await fs.readdir(notebook.path)

  if (filenames.length > 0) {
    await Promise.all(
      filenames.map(async file => {
        const fileInfo = await getInfoNote(`${notebook.path}/${file}`)
        if (fileInfo.isNote) {
          await deleteNote(fileInfo)
        } else {
          await deleteNotebook(fileInfo)
        }
      })
    )
  }
  await fs.rmdir(notebook.path)
}
