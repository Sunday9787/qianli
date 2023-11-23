import { IsNumber, IsOptional, IsString } from 'class-validator'
import { ListQueryDTO } from '@/class/query'

export class PostDTO {
  @IsNumber()
  id: number
  @IsNumber()
  category_id: number
  @IsString()
  title: string
  @IsString()
  desc: string
  @IsString()
  content: string
  @IsString()
  img: string
}

export class PostQueryDTO extends ListQueryDTO {
  @IsOptional()
  @IsNumber()
  category_id?: number

  @IsOptional()
  @IsString()
  title?: string
}
