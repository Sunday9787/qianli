import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator'
import { ListQueryDTO } from '@/class/query'

export class PostDTO {
  @IsNumber()
  category_id: number
  @IsDate()
  date: Date
  @IsNumber()
  pv: number
  @IsString()
  title: string
  @IsString()
  desc: string
  @IsString()
  content: string
  @IsString()
  img: string
}

export class PostEditDTO extends PostDTO {
  @IsNumber()
  id: number
}

export class PostQueryDTO extends ListQueryDTO {
  @IsOptional()
  @IsNumber()
  category_id?: number

  @IsOptional()
  @IsString()
  title?: string
}
