import { Body, Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryDTO } from './category.dto'

@Controller('common/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

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

  @HttpCode(HttpStatus.OK)
  @Post('list')
  list() {
    return this.categoryService.all()
  }
}
