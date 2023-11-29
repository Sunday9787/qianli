import { Controller, Post, UseInterceptors, UploadedFile, HttpCode } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadService } from './upload.service'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @HttpCode(200)
  @Post('post/image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 10 * 1024 * 1024
      }
    })
  )
  uploadPost(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadImage('post', file)
  }

  @HttpCode(200)
  @Post('product/image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 10 * 1024 * 1024
      }
    })
  )
  uploadProduct(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadImage('product', file)
  }
}
