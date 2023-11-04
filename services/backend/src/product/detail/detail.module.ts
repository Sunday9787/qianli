import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { LayoutModule } from '@/layout/layout.module'
import { DetailService } from './detail.service'
import { DetailController } from './detail.controller'
import { ProductEntity } from '../product.entity'
import { ProductFeatureEntity } from './detail.feature.entity'
import { ProductScenarioEntity } from './detail.scenario.entity'
import { ProductSpecEntity } from './detail.spec.entity'
import { ProductFileEntity } from './detail.file.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductFeatureEntity,
      ProductScenarioEntity,
      ProductSpecEntity,
      ProductFileEntity
    ]),
    LayoutModule
  ],
  controllers: [DetailController],
  providers: [DetailService],
  exports: [DetailService]
})
export class DetailModule {}
