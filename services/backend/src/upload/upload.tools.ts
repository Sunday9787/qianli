import { Logger } from '@nestjs/common'
import fs from 'node:fs'
import path from 'node:path/posix'
import crypto from 'node:crypto'
import { fileExt } from 'backend/tools'

/**
 * @param originalname 原始文件名(带文件后缀)
 * @example createTempChunkName('test.png', 1) => 'test.png.chunk1'
 */
export function chunkName(originalname: string, index: string) {
  return originalname + `.chunk${index}`
}

function chunkIndex(fileName: string) {
  const index = fileExt(fileName)!.match(/\d+/)![0] as string
  return Number(index)
}

/**
 * 升序 chunk
 */
export function sortChunk(a: string, b: string) {
  const indexA = chunkIndex(a)
  const indexB = chunkIndex(b)

  return indexA - indexB
}

/**
 * 找到当前文件的 所有 chunk 并 升序排序
 */
export function chunk(uploadPath: string) {
  return fs.readdirSync(uploadPath).sort(sortChunk)
}

/**
 * 递归删除文件
 */
export async function deepRM(dir: string) {
  Logger.log(dir, '开始删除临时目录')
  const files = await fs.promises.readdir(dir)

  await Promise.all(
    files.map(async function (file) {
      const filePath = path.join(dir, file)
      const stat = await fs.promises.stat(filePath)
      if (stat.isDirectory()) {
        await deepRM(filePath)
      } else {
        await fs.promises.rm(filePath)
      }
    })
  )

  await fs.promises.rmdir(dir)
  Logger.log(dir, '临时目录删除完成')
}

export function md5(buffer: Buffer) {
  // 以md5的格式创建一个哈希值
  const hash = crypto.createHash('md5')
  return hash.update(buffer).digest('hex')
}
