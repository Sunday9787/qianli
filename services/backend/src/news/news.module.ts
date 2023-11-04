import { Module } from '@nestjs/common'
import { PostModule } from '@/post/post.module'
import { NewsController } from './news.controller'
import { NewsService } from './news.service'

@Module({
  imports: [PostModule],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
