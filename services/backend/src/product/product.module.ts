import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryEntity } from '@/common/category/category.entity'

import { ProductFeatureEntity } from './detail/detail.feature.entity'
import { ProductFileEntity } from './detail/detail.file.entity'
import { DetailModule } from './detail/detail.module'
import { ProductScenarioEntity } from './detail/detail.scenario.entity'
import { ProductSpecEntity } from './detail/detail.spec.entity'
import { ProductController } from './product.controller'
import { ProductEntity } from './product.entity'
import { ProductService } from './product.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductFeatureEntity,
      ProductScenarioEntity,
      ProductSpecEntity,
      ProductFileEntity,
      CategoryEntity
    ]),
    DetailModule
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
