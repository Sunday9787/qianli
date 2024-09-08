import { IsString } from 'class-validator'

export class AuthLocalDTO {
  @IsString()
  code: string

  @IsString()
  email: string

  @IsString()
  password: string
}
