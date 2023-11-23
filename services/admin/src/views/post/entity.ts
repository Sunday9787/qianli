import type { UploadCustomRequestOptions } from 'naive-ui'
import { Expose } from 'class-transformer'
import { AbstractEntity } from '@/class/abstractDTO'
import { uploadPostFile } from '@/api/common'
import { PostServer, type QueryPostDTO } from '@/api/post'

export class PostEntity extends AbstractEntity implements QueryPostDTO {
  private static readonly service = new PostServer()
  readonly date!: string
  readonly pv!: number
  @Expose() id: number
  @Expose() category_id!: number
  @Expose() title!: string
  @Expose() desc!: string
  @Expose() content!: string
  @Expose() img!: string

  constructor(id = 0) {
    super()
    this.id = id
    this.init()
  }

  save() {
    return PostEntity.service.save(this.toJSON())
  }

  detail() {
    return PostEntity.service.detail(this.id)
  }

  del() {
    return PostEntity.service.del(this.id)
  }

  async upload(option: UploadCustomRequestOptions) {
    const data = new FormData()
    data.append('file', option.file.file!)

    try {
      const response = await uploadPostFile(data, {
        onUploadProgress({ progress }) {
          option.onProgress({ percent: Math.ceil(progress!) })
        }
      })

      option.file.url = response.ossUrl

      option.onFinish()
    } catch {
      option.onError()
    }
  }
}
