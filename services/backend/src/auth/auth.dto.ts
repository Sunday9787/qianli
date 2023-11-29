import { IsString } from 'class-validator'

export class AuthDTO {
  @IsString()
  email: string
  @IsString()
  password: string
}
