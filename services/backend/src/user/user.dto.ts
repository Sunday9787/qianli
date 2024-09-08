import { Expose } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'

import { AuthLocalDTO } from '@/auth/auth.dto'
import { ListQueryDTO } from '@/class/query'

export class UserDTO extends AuthLocalDTO {
  @IsNumber()
  id: number

  @IsString()
  username: string

  @IsOptional()
  @IsString()
  avatar: string | null
}

export class UserForgetDTO {
  @IsNumber()
  id: number
  @IsString()
  password: string
}

export class UserLoginResponseDTO {
  @Expose()
  id: number

  @Expose()
  username: string

  @Expose()
  email: string

  @Expose()
  token: string

  @Expose()
  avatar: string

  @Expose()
  access_token: string

  @Expose()
  refresh_token: string
}

export class UserQueryDTO extends ListQueryDTO {
  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsString()
  username?: string

  @IsOptional()
  @IsNumber()
  created_start?: number

  @IsOptional()
  @IsNumber()
  created_end?: number
}

export class UserResponseDTO {
  id: number
  email: string
  username: string
  avatar: string
  created: Date
  updated: Date
}
