import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance, Transform } from 'class-transformer'
import dayjs from 'dayjs'
import { Like, Not, Repository } from 'typeorm'

import { QianliQuery } from '@/class/query'
import type { CategoryEntity } from '@/common/category/category.entity'
import { LayoutService } from '@/layout/layout.service'

import { PostDTO, PostQueryDTO } from './post.dto'
import { PostEntity } from './post.entity'

class RenderPostDTO {
  id: number
  category: CategoryEntity
  get category_name() {
    return this.category.category_name
  }
  category_id: number
  @Transform(val => dayjs(val.value).format('YYYY-MM-DD'))
  date: Date
  @Transform(val => dayjs(val.value).format('YYYY-MM-DD'))
  created: Date
  @Transform(val => dayjs(val.value).format('YYYY-MM-DD'))
  updated: Date
  pv: number
  title: string
  desc: string
  img: string
}

class RenderPostDetailDTO extends RenderPostDTO {
  @Transform(val => val.value)
  content: string
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
      this.postRepository.findOne({ where: { id, status: 1 }, relations: { category: true } }).then(function (entity) {
        return plainToInstance(RenderPostDetailDTO, entity)
      }),
      this.postRepository
        .find({ where: { id: Not(id), status: 1 }, relations: { category: true } })
        .then(function (result) {
          return plainToInstance(RenderPostDTO, result)
        })
    ])

    return {
      layout,
      post,
      recommends
    }
  }

  all(query: PostQueryDTO, api = false) {
    const qianliQuery = new QianliQuery(query, function (entity: PostEntity) {
      return plainToInstance(RenderPostDTO, entity)
    })

    return this.postRepository
      .findAndCount({
        where: {
          status: api ? null : 1,
          title: query.title ? Like(`%${query.title}%`) : null,
          category_id: query.category_id ? query.category_id : null
        },
        select: ['category', 'category_id', 'date', 'desc', 'id', 'title', 'img', 'created', 'updated'],
        relations: { category: true },
        ...qianliQuery.option
      })
      .then(function (result) {
        return qianliQuery.data(result)
      })
  }

  detail(id: number) {
    return this.postRepository.findOne({ where: { id }, relations: { category: true } }).then(function (entity) {
      return plainToInstance(RenderPostDetailDTO, entity)
    })
  }
}
