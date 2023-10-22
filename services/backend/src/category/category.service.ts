import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { CategoryEntity } from './category.entity'
import { CategoryAddDTO } from './category.dto'

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>) {}

  /**
   * 添加分类
   */
  add(body: CategoryAddDTO) {
    return this.categoryRepository.save(body)
  }
}
