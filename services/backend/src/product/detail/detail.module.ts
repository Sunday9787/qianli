import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LayoutModule } from '@/layout/layout.module'

import { ProductEntity } from '../product.entity'
import { DetailController } from './detail.controller'
import { ProductFeatureEntity } from './detail.feature.entity'
import { ProductFileEntity } from './detail.file.entity'
import { ProductScenarioEntity } from './detail.scenario.entity'
import { DetailService } from './detail.service'
import { ProductSpecEntity } from './detail.spec.entity'

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
