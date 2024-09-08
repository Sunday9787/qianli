import { Expose } from 'class-transformer'

import { AbstractEntity, type EntityJSON } from '@/class/abstractEntity'

import { AuthService } from './auth.service'

export type AuthLoginEntityJSON = EntityJSON<AuthEntity>

export class AuthLoginEntityResult {
  @Expose() id: number
  @Expose() email: string
  @Expose() access_token: string
  @Expose() refresh_token: string
  @Expose() username: string
  @Expose() avatar: string
  @Expose() createAt: string
  @Expose() updateAt: string
}

export class AuthEntity extends AbstractEntity {
  private static service = new AuthService()

  public static logIn(data: AuthLoginEntityJSON) {
    return AuthEntity.service.logIn(data)
  }

  public static logOut() {
    return AuthEntity.service.logOut()
  }

  @Expose() email: string
  @Expose() password: string
  @Expose() code: string
}
