import { Inject, Injectable } from '@nestjs/common'
import { LayoutService } from '@/layout/layout.service'
import { PostService } from '@/post/post.service'

@Injectable()
export class NewsService {
  constructor(
    @Inject(LayoutService) private readonly layoutService: LayoutService,
    @Inject(PostService) private readonly postService: PostService
  ) {}

  async data() {
    const news = await this.postService.all()

    return {
      layout: this.layoutService.layout({ ghost: ['news'] }),
      post: news.shift(),
      news
    }
  }
}
