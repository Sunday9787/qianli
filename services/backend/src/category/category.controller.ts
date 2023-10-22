import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { CategoryAddDTO } from './category.dto'
import { CategoryService } from './category.service'

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @HttpCode(HttpStatus.OK)
  @Post('add')
  add(@Body() body: CategoryAddDTO) {
    return this.categoryService.add(body)
  }
}
