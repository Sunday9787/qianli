import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { PostCategoryEntity } from './category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PostCategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class PostCategoryModule {}
