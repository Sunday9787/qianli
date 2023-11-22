import { IsNumber, IsString } from 'class-validator'

export class DepartmentDTO {
  @IsNumber()
  id: number

  @IsString()
  department_name: string
}
