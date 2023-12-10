import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'
import { UploadController } from './upload.controller'
import { UploadFileService } from './upload.file.service'

@Module({
  providers: [UploadService, UploadFileService],
  controllers: [UploadController]
})
export class UploadModule {}
