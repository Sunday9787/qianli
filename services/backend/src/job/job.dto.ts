import { ListQueryDTO } from '@/class/query'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class JobDTO {
  @IsNumber()
  id: number

  @IsString()
  title: string

  @IsNumber()
  num: number

  @IsNumber()
  department_id: number

  status: 0 | 1
  @IsString()
  city: string

  @IsString()
  requirement: string

  @IsString()
  responsibility: string
  created: Date
  updated: Date
}

export class JobQueryDTO extends ListQueryDTO {
  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsNumber()
  department_id: number

  @IsOptional()
  @IsNumber()
  status: 0 | 1

  @IsOptional()
  @IsString()
  city: string

  @IsOptional()
  @IsNumber()
  created_start: number
  @IsOptional()
  @IsNumber()
  created_end: number
}
