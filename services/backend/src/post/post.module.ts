import { Module } from '@nestjs/common'
import { LayoutService } from '@/layout/layout.service'
import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
  controllers: [PostController],
  providers: [PostService, LayoutService]
})
export class PostModule {}
