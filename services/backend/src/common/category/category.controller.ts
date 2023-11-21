import { Body, Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryDTO, CategoryEditDTO } from './category.dto'

@Controller('common/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @HttpCode(HttpStatus.OK)
  @Put('add')
  add(@Body() body: CategoryDTO) {
    return this.categoryService.add(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('edit/:id')
  edit(@Body() body: CategoryEditDTO) {
    return this.categoryService.edit(body)
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
