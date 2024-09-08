import { Transform } from 'class-transformer'

import { AbstractEntity, type EntityQuery } from '@/class/abstractEntity'
import { formatDate } from '@/utils'

import { PostServer } from './post.service'

export class PostQueryEntity {
  category_id?: number
  title?: string
  created_start?: number
  created_end?: number
}

export class PostItemEntity {
  private static readonly service = new PostServer()

  public static form() {
    return new PostQueryEntity()
  }

  public static select(data: EntityQuery<PostQueryEntity & AppRequest.List>) {
    return AbstractEntity.wrapper(PostItemEntity, PostItemEntity.service.select(data))
  }

  public static del(id: number) {
    return PostItemEntity.service.del(id)
  }

  id!: number
  category_id!: number
  category_name!: string
  title!: string
  desc!: string
  img!: string

  @Transform(val => formatDate(val.value))
  readonly date!: string
  @Transform(val => formatDate(val.value))
  readonly created!: string
  @Transform(val => formatDate(val.value))
  readonly updated!: string
}
