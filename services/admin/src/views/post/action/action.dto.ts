import { Expose } from 'class-transformer'
import { AbstractEntity } from '@/class/abstractDTO'
import { type QueryPostAdd, type QueryPostEdit, PostServer } from '@/api/post'

export class PostActionAddDTO extends AbstractEntity implements QueryPostAdd {
  server = new PostServer()

  @Expose() category_id = -1
  @Expose() title = ''
  @Expose() desc = ''
  @Expose() content = ''
  @Expose() img = ''

  save() {
    return this.server.create(this.toJSON())
  }
}

export class PostActionEditDTO extends AbstractEntity implements QueryPostEdit {
  server = new PostServer()

  @Expose() id!: number
  @Expose() category_id!: number
  @Expose() title!: string
  @Expose() desc!: string
  @Expose() content!: string
  @Expose() img!: string

  save() {
    return this.server.save(this.toJSON())
  }
}
