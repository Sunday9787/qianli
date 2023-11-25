import { Expose } from 'class-transformer'
import type { UploadCustomRequestOptions } from 'naive-ui'
import { AbstractEntity, type EntityJSON, type EntityQuery } from '@/class/abstractEntity'
import { uploadPostFile } from './common.service'
import { PostServer } from './post.service'

export type PostEntityJSON = EntityJSON<PostEntity>

export class PostQueryEntity {
  category_id?: number
  title?: string
  created_start?: number
  created_end?: number
}

export class PostEntity extends AbstractEntity {
  private static readonly service = new PostServer()

  public static form() {
    return new PostQueryEntity()
  }

  public static select(data: EntityQuery<PostQueryEntity & AppRequest.List>) {
    return PostEntity.service.select(data)
  }

  public static del(id: number) {
    return PostEntity.service.del(id)
  }

  readonly date!: string
  readonly pv!: number
  readonly created!: string
  readonly updated!: string
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
