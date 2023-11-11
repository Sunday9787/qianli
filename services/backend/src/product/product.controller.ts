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
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
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
  @Post('edit')
  edit(@Body() body: ProductEditDTO) {
    return this.productService.edit(body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('del/:id')
  del(@Param(new ParseIntPipe()) id: number) {
    return this.productService.del(id)
  }

  @HttpCode(HttpStatus.OK)
  @Post('list')
  list(@Body() body: ProductQueryListDTO) {
    return this.productService.all(body)
  }
}
