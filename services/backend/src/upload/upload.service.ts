import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import path from 'path'
import fs from 'fs'

const host = 'http://localhost:3000'
const projectRoot = path.resolve(process.cwd(), '..', '..')

@Injectable()
export class UploadService {
  private readonly uploadPath = path.join(projectRoot, 'public/upload')

  private readonly publicPath = '/upload'

  public uploadImage(type: 'post', file: Express.Multer.File) {
    const date = new Date()

    const month = date.getMonth() + 1
    const filePath = path.join(this.uploadPath, month.toString())
    const fileName = dayjs().format('YYYY-MM-DD') + '-' + date.getTime() + path.extname(file.originalname)

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath)
    }

    fs.writeFileSync(path.join(filePath, fileName), file.buffer)

    return {
      uploaded: file.buffer.length,
      ossUrl: host + path.join(this.publicPath, month.toString(), fileName)
    }
  }
}
