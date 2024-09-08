const regExp = {
  fileExt: /(\.(?!\d)[a-zA-Z\d]+)$/
}

/**
 * 获取文件后缀
 *
 * @export
 * @param {string} file
 * @returns
 */
export function fileExt(file: string) {
  const ext = file.match(regExp.fileExt)
  return ext && ext[0]
}

/**
 * 通过带后缀文件名 获取 文件名(不带后缀)
 */
export function fileName(name: string) {
  return name.replace(regExp.fileExt, '')
}
