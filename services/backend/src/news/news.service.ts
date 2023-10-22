import { Injectable } from '@nestjs/common'
import { LayoutService } from '@/layout/layout.service'
import { PostService } from '@/post/post.service'

@Injectable()
export class NewsService {
  constructor(private layoutService: LayoutService, private postService: PostService) {}

  data() {
    const news = this.postService.all()

    return {
      layout: this.layoutService.layout({ ghost: ['news'] }),
      post: news.shift(),
      news
    }
  }
}
