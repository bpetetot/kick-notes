import { getFS } from './init'

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

export const list = async filepath => {
  const exist = await existsFolder(filepath)
  if (!exist) return

  const filenames = await getFS().readdir(filepath)

  const filesinfo = await Promise.all(
    filenames.map(async file => {
      const path = `${filepath}/${file}`
      const stats = await stat(path)
      return {
        file,
        path,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
        isDotFile: file.startsWith('.'),
        extension: file.split('.').pop(),
        level: path.split('/').length - 2,
      }
    })
  )

  return filesinfo.filter(
    file => (file.isDirectory && !file.isDotFile) || file.extension === 'md'
  )
}

export const readFile = async filepath => {
  const stats = await stat(filepath)
  if (!stats || stats.isDirectory()) return

  const uint8array = await getFS().readFile(filepath)
  return new TextDecoder('utf-8').decode(uint8array)
}
