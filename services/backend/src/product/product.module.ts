import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { LayoutModule } from '@/layout/layout.module'
import { CategoryModule } from './category/category.module'

import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { ProductEntity } from './product.entity'
import { ProductDetailEntity } from './product.detail.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductDetailEntity]), LayoutModule, CategoryModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
