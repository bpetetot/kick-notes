import fs, {
  stat,
  generateFilename,
  generateFoldername,
  ROOT_FOLDER,
} from '../fs'
import first from 'lodash/first'
import last from 'lodash/last'

const DEFAULT_NOTEBOOK_NAME = 'New notebook'
const DEFAULT_NOTE_NAME = 'New note.md'

const DEFAULT_NOTEBOOK = {
  file: 'All notebooks',
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

  return filesinfo.filter(
    file => (file.isNotebook && !file.isHidden) || file.extension === 'md'
  )
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
  await fs.writeFile(filepath, '# New note', { encoding: 'utf8' })

  return getInfoNote(filepath)
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
