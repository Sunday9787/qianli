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
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { CacheInterceptor } from '@nestjs/cache-manager'
import { ProductService } from './product.service'
import { ProductDTO, ProductQueryListDTO } from './product.dto'

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
  @Put('save')
  add(@Body() body: ProductDTO) {
    const { img, spec, scenario, feature, ...base } = body

    return this.productService.save(base, feature, scenario, spec, img)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('del/:id')
  del(@Param(new ParseIntPipe()) id: number) {
    return this.productService.del(id)
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
  @Post('list')
  list(@Body() body: ProductQueryListDTO) {
    return this.productService.all(body)
  }
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
  @Post(':id')
  detail(@Param('id', new ParseIntPipe()) id: number) {
    return this.productService.detail(id)
  }
}
