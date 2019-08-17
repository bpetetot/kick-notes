import fs, { stat, ROOT_FOLDER } from '../services/fs'

const DEFAULT_NOTEBOOK = {
  file: 'All notebooks',
  path: ROOT_FOLDER,
  level: 0,
  isDirectory: true,
}

const getInfoNote = async filepath => {
  const stats = await stat(filepath)
  if (!stats) return

  const pathArray = filepath.split('/')
  const file = pathArray.pop()
  return {
    file,
    path: filepath,
    parent: pathArray.join('/'),
    isFile: stats.isFile(),
    isDirectory: stats.isDirectory(),
    isDotFile: file.startsWith('.'),
    extension: file.split('.').pop(),
    level: filepath.split('/').length - 2,
  }
}

export const listNotes = async filepath => {
  const filenames = await fs.readdir(filepath)

  const filesinfo = await Promise.all(
    filenames.map(async file => getInfoNote(`${filepath}/${file}`))
  )

  return filesinfo.filter(
    file => (file.isDirectory && !file.isDotFile) || file.extension === 'md'
  )
}

export const getNote = async filepath => {
  const info = await getInfoNote(filepath)
  if (!info || info.isDirectory) return
  const uint8array = await fs.readFile(filepath)
  const content = new TextDecoder('utf-8').decode(uint8array)

  return { ...info, content }
}

export const getNotebook = async filepath => {
  let info = await getInfoNote(filepath)

  if (!info) return DEFAULT_NOTEBOOK

  if (info.isDirectory) return info

  return getInfoNote(info.parent)
}
