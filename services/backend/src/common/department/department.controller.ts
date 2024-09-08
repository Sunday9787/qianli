import { CacheInterceptor } from '@nestjs/cache-manager'
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors
} from '@nestjs/common'

import { Public } from '@/decorator/public'

import { DepartmentDTO } from './department.dto'
import { DepartmentService } from './department.service'

@Controller('common/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @HttpCode(HttpStatus.OK)
  @Put('save')
  save(@Body() body: DepartmentDTO) {
    return this.departmentService.save(body)
  }

  @Public()
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
