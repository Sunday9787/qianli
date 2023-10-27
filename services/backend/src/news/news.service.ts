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
    const [layout, news] = await Promise.all([this.layoutService.layout({ ghost: ['news'] }), this.postService.all()])

    return {
      layout,
      post: news.shift(),
      news
    }
  }
}
