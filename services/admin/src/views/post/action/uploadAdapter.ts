import type { UploadAdapter, FileLoader } from '@ckeditor/ckeditor5-upload'
import { uploadPostFile } from '@/service/common.service'

export class UploadPostAdapter implements UploadAdapter {
  constructor(private readonly loader: FileLoader) {}

  async upload() {
    const file = await this.loader.file
    const data = new FormData()
    data.append('file', file!)

    const response = await uploadPostFile(data)

    return {
      default: response.ossUrl
    }
  }

  abort() {
    // Reject promise returned from upload() method.
  }
}
