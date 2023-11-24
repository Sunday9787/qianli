import { ListQueryDTO } from '@/class/query'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class FeedbackDTO {
  id: number
  name: string
  contact: string
  area: string
  message: string
  status: 0 | 1
}

export class FeedbackQueryDTO extends ListQueryDTO {
  @IsOptional()
  @IsNumber()
  id: number

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  contact: string

  @IsOptional()
  @IsString()
  area: string

  @IsOptional()
  @IsString()
  message: string
}
