import { Inject, Injectable } from '@nestjs/common'
import { LayoutService } from '@/layout/layout.service'
import { PostService } from '@/post/post.service'
import { PostQueryDTO } from '@/post/post.dto'

import { QianliPagination } from 'backend/tools/pagination'

@Injectable()
export class NewsService {
  constructor(
    @Inject(LayoutService) private readonly layoutService: LayoutService,
    @Inject(PostService) private readonly postService: PostService
  ) {}

  async data(query: PostQueryDTO) {
    const [layout, news] = await Promise.all([
      this.layoutService.layout({ ghost: ['news'] }),
      this.postService.all(query)
    ])

    return {
      pagination: new QianliPagination({
        total: news.total,
        current: news.current,
        pageSize: news.size,
        perPages: 4,
        baseURL: `/news?size=${query.size}&current=$pager`
      }),
      layout,
      post: news.list.shift(),
      news
    }
  }
}
