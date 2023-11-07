import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UserDTO {
  @IsString()
  username: string
  @IsString()
  password: string
}

export class UserAddDTO extends UserDTO {
  @IsOptional()
  @IsString()
  avatar: string | null
}

export class UserEditDTO extends UserDTO {
  @IsNumber()
  id: number
}

export class UserLoginDTO {
  id: number
  username: string
  token: string
  avatar: string
}
