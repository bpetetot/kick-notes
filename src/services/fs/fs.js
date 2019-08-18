import fs from './index'

export const stat = async filepath => {
  if (!filepath) return
  try {
    const result = await fs.stat(filepath)
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

export const generateFilename = async (path, filename, increment = 0) => {
  const [name, extension] = filename.split('.')

  let filepath = `${path}/${filename}`
  if (increment > 0) {
    filepath = `${path}/${name} ${increment}.${extension}`
  }
  const stats = await stat(filepath)
  if (stats) {
    return generateFilename(path, filename, increment + 1)
  }
  return filepath
}

export const generateFoldername = async (path, folder, increment = 0) => {
  let filepath = `${path}/${folder}`
  if (increment > 0) {
    filepath = `${path}/${folder} ${increment}`
  }
  const stats = await stat(filepath)
  if (stats) {
    return generateFoldername(path, folder, increment + 1)
  }
  return filepath
}
