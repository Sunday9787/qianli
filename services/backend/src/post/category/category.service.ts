import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { PostCategoryEntity } from './category.entity'
import { CategoryAddDTO } from './category.dto'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(PostCategoryEntity) private readonly categoryRepository: Repository<PostCategoryEntity>
  ) {}

  /**
   * 添加分类
   */
  add(body: CategoryAddDTO) {
    return this.categoryRepository.save(body)
  }
}
