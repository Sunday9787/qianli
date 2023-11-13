import { IsNumber, IsOptional, IsString } from 'class-validator'
import { ListQueryDTO } from '@/class/query'

export class UserDTO {
  @IsString()
  email: string
  @IsString()
  password: string
}

export class UserAddDTO extends UserDTO {
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

export class UserEditDTO {
  @IsNumber()
  id: number
  @IsOptional()
  @IsString()
  avatar: string | null
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
