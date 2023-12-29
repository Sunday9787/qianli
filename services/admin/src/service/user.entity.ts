import type { AbstractEntityMethod, EntityJSON, EntityQuery, AbstractEntityDoUpload } from '@/class/abstractEntity'
import type { UploadCustomRequestOptions } from 'naive-ui'
import { Expose } from 'class-transformer'
import { AbstractEntity } from '@/class/abstractEntity'
import { uploadProductImage } from './common.service'
import { UserService } from './user.service'

export type UserEntityJSON = EntityJSON<UserEntity>
export type UserAuthEntityJSON = EntityJSON<UserAuthEntity>

export class UserAuthEntityResult {
  @Expose() id!: number
  @Expose() email!: string
  @Expose() token!: string
  @Expose() username!: string
  @Expose() avatar!: string
}

export class UserAuthEntity extends AbstractEntity implements AbstractEntityMethod {
  private static service = new UserService()

  public static logOut() {
    return UserAuthEntity.service.logOut()
  }

  @Expose() password!: string
  @Expose() email!: string
  @Expose() code!: string

  logIn() {
    return UserAuthEntity.service.logIn(this.toJSON())
  }
}

export class UserQueryEntity {
  username?: string
  email?: string
  created_start?: number
  created_end?: number
}

export class UserEntity extends AbstractEntity implements AbstractEntityMethod {
  private static service = new UserService()

  public static del(id: number) {
    return UserEntity.service.del(id)
  }

  public static form() {
    return new UserQueryEntity()
  }

  public static select(data: EntityQuery<UserQueryEntity> & AppRequest.List) {
    return UserEntity.service.select(data)
  }

  @Expose() id: number
  @Expose() email!: string
  @Expose() username!: string
  @Expose() avatar!: string
  @Expose() password!: string
  created!: string
  updated!: string

  constructor(id = 0) {
    super()
    this.id = id
  }

  copy(data: UserEntityJSON) {
    this.id = data.id
    this.email = data.email
    this.username = data.username
    this.avatar = data.avatar
    this.password = data.password
  }

  save() {
    return UserEntity.service.save(this.toJSON())
  }

  upload(option: UploadCustomRequestOptions) {
    UserEntity.doUpload(option, uploadProductImage as AbstractEntityDoUpload)
  }
}
