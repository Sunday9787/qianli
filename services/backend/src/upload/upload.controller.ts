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
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
    return this.uploadService.uploadImage('post', file)
  }
}
