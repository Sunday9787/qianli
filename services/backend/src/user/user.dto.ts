import { IsNumber, IsOptional, IsString } from 'class-validator'
import { ListQueryDTO } from '@/class/query'
import { AuthDTO } from '@/auth/auth.dto'

export class UserDTO extends AuthDTO {
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
  id: number
  username: string
  email: string
  token: string
  avatar: string
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
