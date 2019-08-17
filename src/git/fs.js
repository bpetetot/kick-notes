import { getFS } from './init'
import { ROOT_FOLDER } from './config'

export const stat = async filepath => {
  if (!filepath) return
  try {
    const result = await getFS().stat(filepath)
    return result
  } catch (e) {
    return null
  }
}

export const existsFolder = async filepath => {
  const statFile = await stat(filepath)
  if (!statFile) return false
  return statFile.type === 'dir'
}

export const getInfo = async filepath => {
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
  const filenames = await getFS().readdir(filepath)

  const filesinfo = await Promise.all(
    filenames.map(async file => getInfo(`${filepath}/${file}`))
  )

  return filesinfo.filter(
    file => (file.isDirectory && !file.isDotFile) || file.extension === 'md'
  )
}

export const getNote = async filepath => {
  const info = await getInfo(filepath)
  if (!info || info.isDirectory) return
  const uint8array = await getFS().readFile(filepath)
  const content = new TextDecoder('utf-8').decode(uint8array)

  return {
    ...info,
    content,
  }
}

export const getNotebook = async filepath => {
  let info = await getInfo(filepath)
  if (!info)
    return {
      file: 'All notebooks',
      path: ROOT_FOLDER,
      level: 0,
      isDirectory: true,
    }

  if (info.isDirectory) {
    return info
  }
  return getInfo(info.parent)
}
