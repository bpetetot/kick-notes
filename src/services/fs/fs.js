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
