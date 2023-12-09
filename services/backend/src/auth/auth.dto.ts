import { IsString } from 'class-validator'

export class AuthDTO {
  @IsString()
  code: string
  @IsString()
  email: string
  @IsString()
  password: string
}
