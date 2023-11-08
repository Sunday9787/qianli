import { IsNumber, IsOptional, IsString } from 'class-validator'

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
