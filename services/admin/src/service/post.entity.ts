import type { AbstractEntityMethod, EntityJSON, AbstractEntityDoUpload } from '@/class/abstractEntity'
import type { UploadCustomRequestOptions } from 'naive-ui'
import { Expose } from 'class-transformer'
import { AbstractEntity } from '@/class/abstractEntity'
import { uploadPostFile } from './common.service'
import { PostServer } from './post.service'

export type PostEntityJSON = EntityJSON<PostEntity>

export class PostQueryEntity {
  category_id?: number
  title?: string
  created_start?: number
  created_end?: number
}

export class PostEntity extends AbstractEntity implements AbstractEntityMethod {
  private static readonly service = new PostServer()

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
  }

  save() {
    return PostEntity.service.save(this.toJSON())
  }

  detail() {
    return PostEntity.service.detail(this.id)
  }

  upload(option: UploadCustomRequestOptions) {
    PostEntity.doUpload(option, uploadPostFile as AbstractEntityDoUpload)
  }
}
