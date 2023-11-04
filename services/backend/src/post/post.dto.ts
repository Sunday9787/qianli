import { Type } from 'class-transformer'
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator'

export class ListDTO<T> {
  size: number
  current: number
  total: number
  list: T[]
}

export class ListQueryDTO {
  @Type(() => Number)
  @IsNumber()
  size: number

  @Type(() => Number)
  @IsNumber()
  current: number

  constructor(size = 10, current = 1) {
    this.size = size
    this.current = current
  }
}

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
