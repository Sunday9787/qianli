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
  Render
} from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductDTO, ProductEditDTO } from './product.dto'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Render('product')
  render() {
    return this.productService.data()
  }

  @HttpCode(HttpStatus.OK)
  @Put('add')
  add(@Body() body: ProductDTO) {
    return this.productService.add(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('edit')
  edit(@Body() body: ProductEditDTO) {
    return this.productService.edit(body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('del/:id')
  del(@Param(new ParseIntPipe()) id: number) {
    return this.productService.del(id)
  }
}
