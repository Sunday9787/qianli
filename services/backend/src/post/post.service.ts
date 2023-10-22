import { Repository } from 'typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LayoutService } from '@/layout/layout.service'
import { CategoryEntity } from '@/category/category.entity'
import { PostEntity } from './post.entity'
import { PostAddDTO } from './post.dto'

const sql = `
  post.id,
  post.category_id,
  post.date,
  post.pv,
  post.title,
  post.desc,
  post.content,
  post.img,
  category.category_name
`

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
    @Inject(LayoutService) private readonly layoutService: LayoutService
  ) {}

  add(body: PostAddDTO) {
    return this.postRepository.save(body)
  }

  async data(id: number) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect(CategoryEntity, 'category', 'post.category_id = category.id')
      .where('post.id = :id', { id })
      .select(sql)
      .getRawOne<PostEntity>()

    const recommends = await this.postRepository.createQueryBuilder().where('id != :id', { id }).getMany()

    return {
      layout: this.layoutService.layout(),
      post,
      recommends
    }
  }

  all() {
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect(CategoryEntity, 'category', 'post.category_id = category.id')
      .select(sql)
      .getRawMany<PostEntity>()
  }
}
