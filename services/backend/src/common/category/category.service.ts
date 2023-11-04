import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryEntity } from './category.entity'
import { CategoryDTO, CategoryEditDTO } from './category.dto'

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>) {}

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
