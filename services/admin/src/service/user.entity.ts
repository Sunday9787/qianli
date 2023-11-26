import type { EntityMethod, EntityJSON, EntityQuery } from '@/class/abstractEntity'
import { AbstractEntity } from '@/class/abstractEntity'
import { Expose } from 'class-transformer'
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

export class UserAuthEntity extends AbstractEntity implements EntityMethod {
  private static service = new UserService()

  public static logOut() {
    return UserAuthEntity.service.logOut()
  }

  @Expose() password!: string
  @Expose() email!: string

  constructor() {
    super()
    this.init()
  }

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

export class UserEntity extends AbstractEntity {
  private static service = new UserService()

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
    this.init()
  }
}
