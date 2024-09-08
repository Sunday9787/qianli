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

import { CategoryDTO } from './category.dto'
import { CategoryService } from './category.service'

@Controller('common/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @HttpCode(HttpStatus.OK)
  @Put('save')
  save(@Body() body: CategoryDTO) {
    return this.categoryService.save(body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('del/:id')
  del(@Param('id', new ParseIntPipe()) id: number) {
    return this.categoryService.del(id)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
  @Post('list')
  list() {
    return this.categoryService.all()
  }
}
