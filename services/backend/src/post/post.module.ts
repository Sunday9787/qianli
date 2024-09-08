import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryEntity } from '@/common/category/category.entity'
import { UserModule } from '@/user/user.module'

import { PostController } from './post.controller'
import { PostEntity } from './post.entity'
import { PostService } from './post.service'

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, CategoryEntity]), UserModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
