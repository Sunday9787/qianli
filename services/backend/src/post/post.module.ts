import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LayoutModule } from '@/layout/layout.module'
import { PostCategoryModule } from './category/category.module'
import { PostCategoryEntity } from './category/category.entity'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { PostEntity } from './post.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostCategoryEntity]), LayoutModule, PostCategoryModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
