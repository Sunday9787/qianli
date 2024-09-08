import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryController } from './category.controller'
import { CategoryEntity } from './category.entity'
import { CategoryService } from './category.service'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
