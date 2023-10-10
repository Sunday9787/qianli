import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { LayoutService } from '@/layout/layout.service'

@Module({
  controllers: [ProductController],
  providers: [ProductService, LayoutService]
})
export class ProductModule {}
