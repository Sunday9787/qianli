import { LayoutService } from '@/layout/layout.service'
import { Injectable } from '@nestjs/common'
import { loadYaml } from 'backend/tools'
import { PostEntity } from './post.entity'

const { posts } = loadYaml<{ posts: PostEntity[] }>('/services/backend/data/post.yaml')
const postMap: Map<number, PostEntity> = new Map(
  posts.map(function (item, index) {
    return [index, item]
  })
)

@Injectable()
export class PostService {
  constructor(private layoutService: LayoutService) {}

  data(id: number) {
    return {
      layout: this.layoutService.layout(),
      post: postMap.get(id),
      recommends: this.all().filter(item => item.id !== id)
    }
  }

  all() {
    return Array.from(postMap.values())
  }
}
