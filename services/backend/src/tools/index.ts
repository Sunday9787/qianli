import crypto from 'node:crypto'

export function md5<T extends object | string>(data: T) {
  const md5 = crypto.createHash('md5')

  if (typeof data === 'string') {
    md5.update(data)
  } else {
    const sortedKeys = Object.keys(data).sort()
    const sortedObjStr = sortedKeys.map(key => `${key}:${data[key]}`).join(',')
    md5.update(sortedObjStr)
  }

  return md5.digest('hex')
}
