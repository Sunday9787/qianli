import { Like, Not, Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LayoutService } from '@/layout/layout.service'
import { PostEntity } from './post.entity'
import { PostDTO, PostQueryDTO } from './post.dto'
import { QianliQuery } from '@/class/query'

import dayjs from 'dayjs'

class RenderPostDTO {
  id: number
  category_name: string
  category_id: number
  date: string
  created: Date
  updated: Date
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
  dto.created = entity.created
  dto.updated = entity.updated
  dto.category_name = entity.category.category_name
  dto.category_id = entity.category_id
  dto.date = dayjs(entity.date).format('YYYY-MM-DD')
  dto.pv = entity.pv
  dto.title = entity.title
  dto.desc = entity.desc
  dto.img = entity.img

  return dto
}

function buildRenderPostDetailDTO(entity: PostEntity) {
  const dto = new RenderPostDetailDTO()
  dto.id = entity.id
  dto.created = entity.created
  dto.updated = entity.updated
  dto.category_name = entity.category.category_name
  dto.category_id = entity.category_id
  dto.date = dayjs(entity.date).format('YYYY-MM-DD')
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

  async save(body: PostDTO) {
    await this.postRepository.save(body)
  }

  async del(id: number) {
    await this.postRepository.delete({ id })
  }

  async data(id: number) {
    await this.postRepository
      .createQueryBuilder()
      .update()
      .set({
        pv: () => 'pv+1'
      })
      .where(`id = :id`, { id })
      .execute()

    const [layout, post, recommends] = await Promise.all([
      this.layoutService.layout(),
      this.postRepository
        .findOne({ where: { id, status: 1 }, relations: { category: true } })
        .then(buildRenderPostDetailDTO),
      this.postRepository
        .find({ where: { id: Not(id), status: 1 }, relations: { category: true } })
        .then(function (result) {
          return result.map(buildRenderPostDTO)
        })
    ])

    return {
      layout,
      post,
      recommends
    }
  }

  all(query: PostQueryDTO, api = false) {
    const qianliQuery = new QianliQuery(query, function (item: PostEntity) {
      return buildRenderPostDTO(item)
    })

    return this.postRepository
      .findAndCount({
        where: {
          status: api ? null : 1,
          title: query.title ? Like(`%${query.title}%`) : null,
          category_id: query.category_id ? query.category_id : null
        },
        select: ['category', 'category_id', 'date', 'desc', 'id', 'title', 'img'],
        relations: { category: true },
        ...qianliQuery.option
      })
      .then(function (result) {
        return qianliQuery.data(result)
      })
  }

  detail(id: number) {
    return this.postRepository.findOne({ where: { id }, relations: { category: true } }).then(buildRenderPostDetailDTO)
  }
}
