import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common'
import path from 'node:path/posix'
import stream from 'node:stream'
import fs from 'node:fs'
import { UploadFileChunkDTO } from './upload.dto'
import { fileName } from 'backend/tools'
import * as tools from './upload.tools'

const host = 'http://localhost:3000'
const projectRoot = path.resolve(process.cwd(), path.resolve('..', '..'))

@Injectable()
export class UploadFileService {
  private readonly uploadPath = path.join(projectRoot, 'public/upload')

  private readonly publicPath = '/upload'

  private mergeChunk(files: string[], filePath: string, writeStream: fs.WriteStream) {
    return new Promise((resolve, reject) => {
      const streamLoop = function (files: string[], writeStream: fs.WriteStream) {
        if (!files.length) {
          Logger.log('已合并完成')

          tools.deepRM(filePath)
          resolve('已合并完成')
          return
        }

        const current = files.shift()!
        const readStream = fs.createReadStream(path.join(filePath, current))
        readStream.pipe(writeStream, { end: false })

        readStream.on('end', () => {
          Logger.log(current, 'chunk已合并完毕')
          streamLoop(files, writeStream)
        })

        readStream.on('error', error => {
          Logger.warn(error, '合并文件失败')
          reject(error)
        })
      }

      streamLoop(files, writeStream)
    })
  }

  private writeChunk(file: Express.Multer.File, chunkPath: string, data: UploadFileChunkDTO) {
    return new Promise((resolve, reject) => {
      const writeStreamPath = path.join(chunkPath, tools.chunkName(decodeURIComponent(file.originalname), data.index))

      const readStream = new stream.PassThrough()
      const writeStream = fs.createWriteStream(writeStreamPath)

      readStream.end(file.buffer)

      Logger.log(writeStreamPath, '写入块')

      readStream.on('data', (chunk: Buffer) => {
        Logger.log(`${chunk.length} 字节`, '开始写入chunk')
      })

      readStream.on('end', () => {
        Logger.log(`总共 ${data.total} 个chunk`, `${data.index} 个chunk已写入完毕`)
        resolve(data.index)
      })

      readStream.on('error', error => {
        Logger.error('块写入失败', error)
        reject(error)
      })

      readStream.pipe(writeStream)
    })
  }

  public async uploadFile(file: Express.Multer.File, data: UploadFileChunkDTO) {
    const originalname = fileName(decodeURIComponent(file.originalname))
    /**
     * 以上传的文件名创建文件夹
     */
    const filePath = path.join(this.uploadPath, originalname + '_temp')

    /**
     * 校验 chunk 是否完整
     */
    if (tools.md5(file.buffer) !== data.hash) {
      throw new HttpException('chunk 损坏 请重新上传', HttpStatus.BAD_REQUEST)
    }

    if (data.index === '1') {
      if (!fs.existsSync(filePath)) fs.mkdirSync(filePath)
    }

    await this.writeChunk(file, filePath, data)

    if (data.index === data.total) {
      /**
       * 所有chunk
       */
      const chunk = tools.chunk(filePath)

      /**
       * 写入文件流
       */
      const writeStream = fs.createWriteStream(path.join(this.uploadPath, decodeURIComponent(file.originalname)))

      await this.mergeChunk(chunk, filePath, writeStream)

      return {
        ossUrl: host + path.join(this.publicPath, file.originalname)
      }
    }

    return {
      process: data.index
    }
  }
}
