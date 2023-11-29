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
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { CacheInterceptor } from '@nestjs/cache-manager'
import { CategoryService } from './category.service'
import { CategoryDTO } from './category.dto'
import { AuthGuard } from '@/auth/auth.guard'

@UseGuards(AuthGuard)
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
  @UseInterceptors(CacheInterceptor)
  @Post('list')
  list() {
    return this.categoryService.all()
  }
}
