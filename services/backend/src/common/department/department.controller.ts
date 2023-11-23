import {
  Body,
  Controller,
  Delete,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  UseInterceptors
} from '@nestjs/common'
import { CacheInterceptor } from '@nestjs/cache-manager'
import { DepartmentService } from './department.service'
import { DepartmentDTO } from './department.dto'

@Controller('common/department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @HttpCode(HttpStatus.OK)
  @Put('save')
  save(@Body() body: DepartmentDTO) {
    return this.departmentService.save(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('list')
  list() {
    return this.departmentService.all()
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
  @Delete('del/:id')
  del(@Param('id', new ParseIntPipe()) id: number) {
    return this.departmentService.del(id)
  }
}
