import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from '@/user/user.module'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { PostEntity } from './post.entity'
import { CategoryEntity } from '@/common/category/category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, CategoryEntity]), UserModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
