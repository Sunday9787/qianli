import { Module } from '@nestjs/common'
import { LayoutService } from '@/layout/layout.service'
import { PostService } from '@/post/post.service'
import { NewsController } from './news.controller'
import { NewsService } from './news.service'

@Module({
  controllers: [NewsController],
  providers: [NewsService, LayoutService, PostService]
})
export class NewsModule {}
