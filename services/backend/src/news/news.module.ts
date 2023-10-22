import { Module } from '@nestjs/common'
import { NewsController } from './news.controller'
import { NewsService } from './news.service'
import { LayoutModule } from '@/layout/layout.module'
import { PostModule } from '@/post/post.module'

@Module({
  imports: [LayoutModule, PostModule],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
