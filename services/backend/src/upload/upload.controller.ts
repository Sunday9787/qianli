import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ValidationPipe,
  UploadedFile,
  HttpCode,
  UsePipes
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadService } from './upload.service'
import { UploadFileService } from './upload.file.service'
import { UploadFileChunkDTO } from './upload.dto'

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly uploadFileService: UploadFileService
  ) {}

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

  @HttpCode(200)
  @Post('file')
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('chunk', {
      limits: {
        fileSize: 10 * 1024 ** 2
      }
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() data: UploadFileChunkDTO) {
    return this.uploadFileService.uploadFile(file, data)
  }
}
