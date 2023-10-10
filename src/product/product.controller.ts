import { Controller, Get, Render } from '@nestjs/common'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Render('product')
  product() {
    return this.productService.data()
  }
}
