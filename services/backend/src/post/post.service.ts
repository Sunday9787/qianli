import { Like, Not, Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LayoutService } from '@/layout/layout.service'
import { PostEntity } from './post.entity'
import { PostDTO, PostQueryDTO } from './post.dto'
import { QianliQuery } from '@/class/query'

class RenderPostDTO {
  id: number
  category_name: string
  category_id: number
  date: Date
  pv: number
  title: string
  desc: string
  img: string
}

class RenderPostDetailDTO extends RenderPostDTO {
  content: string
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
  dto.img = entity.img

  return dto
}

function buildRenderPostDetailDTO(entity: PostEntity) {
  const dto = new RenderPostDetailDTO()
  dto.id = entity.id
  dto.category_name = entity.category.category_name
  dto.category_id = entity.category_id
  dto.date = entity.date
  dto.pv = entity.pv
  dto.title = entity.title
  dto.content = entity.content
  dto.desc = entity.desc
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
      this.postRepository.findOne({ where: { id }, relations: { category: true } }).then(buildRenderPostDetailDTO),
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

  all(query: PostQueryDTO) {
    const qianliQuery = new QianliQuery(query, function (item: PostEntity) {
      return buildRenderPostDTO(item)
    })

    return this.postRepository
      .findAndCount({
        where: {
          title: query.title ? Like(`%${query.title}%`) : null
        },
        select: ['category', 'category_id', 'date', 'desc', 'id', 'title', 'img'],
        relations: { category: true },
        ...qianliQuery.option
      })
      .then(function (result) {
        return qianliQuery.data(result)
      })
  }
}
