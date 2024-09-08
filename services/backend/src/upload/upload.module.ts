import { Module } from '@nestjs/common'

import { UploadController } from './upload.controller'
import { UploadFileService } from './upload.file.service'
import { UploadService } from './upload.service'

@Module({
  providers: [UploadService, UploadFileService],
  controllers: [UploadController]
})
export class UploadModule {}
