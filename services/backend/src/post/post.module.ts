import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LayoutModule } from '@/layout/layout.module'
import { CategoryEntity } from '@/category/category.entity'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { PostEntity } from './post.entity'

@Module({
  imports: [LayoutModule, TypeOrmModule.forFeature([PostEntity, CategoryEntity])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
