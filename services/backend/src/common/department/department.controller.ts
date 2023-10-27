import { Body, Controller, Delete, Post, HttpCode, HttpStatus, Param, ParseIntPipe, Put } from '@nestjs/common'
import { DepartmentService } from './department.service'
import { DepartmentDTO, DepartmentUpdateDTO } from './department.dto'

@Controller('common/department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @HttpCode(HttpStatus.OK)
  @Put('add')
  add(@Body() body: DepartmentDTO) {
    return this.departmentService.add(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('edit/:id')
  edit(@Body() body: DepartmentUpdateDTO) {
    return this.departmentService.edit(body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('del/id')
  del(@Param(new ParseIntPipe()) id: number) {
    return this.departmentService.del(id)
  }
}
