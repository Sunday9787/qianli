import { Module } from '@nestjs/common'
import { LayoutService } from '@/layout/layout.service'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { DetailModule } from './detail/detail.module'

@Module({
  imports: [DetailModule],
  controllers: [ProductController],
  providers: [ProductService, LayoutService]
})
export class ProductModule {}
