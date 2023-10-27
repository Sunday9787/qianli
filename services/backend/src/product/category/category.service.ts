import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductCategoryEntity } from './category.entity'
import { CategoryDTO, CategoryEditDTO } from './category.dto'

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(ProductCategoryEntity) private categoryRepository: Repository<ProductCategoryEntity>) {}

  add(body: CategoryDTO) {
    return this.categoryRepository.save(body)
  }

  del(id: number) {
    return this.categoryRepository.delete(id)
  }

  edit(body: CategoryEditDTO) {
    return this.categoryRepository.update({ id: body.id }, body)
  }

  all() {
    return this.categoryRepository.find()
  }
}
