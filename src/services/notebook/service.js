import fs, { stat, ROOT_FOLDER } from '../fs'
import first from 'lodash/first'
import last from 'lodash/last'

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
