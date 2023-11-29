import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthGuard } from '@/auth/auth.guard'

import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { ProductEntity } from './product.entity'
import { DetailModule } from './detail/detail.module'

import { CategoryEntity } from '@/common/category/category.entity'
import { ProductFeatureEntity } from './detail/detail.feature.entity'
import { ProductScenarioEntity } from './detail/detail.scenario.entity'
import { ProductSpecEntity } from './detail/detail.spec.entity'
import { ProductFileEntity } from './detail/detail.file.entity'

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
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthGuard).exclude({ path: '/product', method: RequestMethod.GET })
  }
}
