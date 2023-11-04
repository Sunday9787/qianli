import { Not, Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LayoutService } from '@/layout/layout.service'
import { PostEntity } from './post.entity'
import { PostDTO } from './post.dto'

class RenderPostDTO extends PostDTO {
  id: number
  category_name: string
}

function buildRenderPostDTO(entity: PostEntity) {
  const dto = new RenderPostDTO()
  dto.id = entity.id
  dto.category_name = entity.category.category_name
  dto.category_id = entity.category_id
  dto.date = entity.date
  dto.pv = entity.pv
  dto.title = entity.title
  dto.desc = entity.desc
  dto.content = entity.content
  dto.img = entity.img

  return dto
}

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
    @Inject(LayoutService) private readonly layoutService: LayoutService
  ) {}

  add(body: PostDTO) {
    return this.postRepository.save(body)
  }

  async data(id: number) {
    const [layout, post, recommends] = await Promise.all([
      this.layoutService.layout(),
      this.postRepository.findOne({ where: { id }, relations: { category: true } }).then(buildRenderPostDTO),
      this.postRepository.find({ where: { id: Not(id) }, relations: { category: true } }).then(function (result) {
        return result.map(buildRenderPostDTO)
      })
    ])

    return {
      layout,
      post,
      recommends
    }
  }

  all(): Promise<RenderPostDTO[]> {
    return this.postRepository.find({ relations: { category: true } }).then(function (result) {
      return result.map(buildRenderPostDTO)
    })
  }
}
