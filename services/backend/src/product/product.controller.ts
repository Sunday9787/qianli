import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Render,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { CacheInterceptor } from '@nestjs/cache-manager'
import { AuthGuard } from '@/auth/auth.guard'
import { ProductService } from './product.service'
import { ProductAddDTO, ProductEditDTO, ProductQueryListDTO } from './product.dto'
import { ProductFileDTO } from './detail/detail.file.dto'

@UsePipes(ValidationPipe)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Render('product')
  render() {
    return this.productService.data()
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Put('add')
  add(@Body() body: ProductAddDTO) {
    const { img, spec, scenario, feature, ...base } = body

    const file = img.map(function (path) {
      const result = new ProductFileDTO()
      result.path = path
      return result
    })

    return this.productService.add(base, feature, scenario, spec, file)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('edit')
  edit(@Body() body: ProductEditDTO) {
    return this.productService.edit(body)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete('del/:id')
  del(@Param(new ParseIntPipe()) id: number) {
    return this.productService.del(id)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @Post('list')
  list(@Body() body: ProductQueryListDTO) {
    return this.productService.all(body)
  }
}
