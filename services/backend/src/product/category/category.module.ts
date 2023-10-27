import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { ProductCategoryEntity } from './category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoryEntity])],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService]
})
export class CategoryModule {}
