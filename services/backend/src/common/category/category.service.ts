import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryEntity } from './category.entity'
import { CategoryDTO, CategoryEditDTO } from './category.dto'

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>) {}

  async add(body: CategoryDTO) {
    await this.categoryRepository.save(body)
  }

  async del(id: number) {
    await this.categoryRepository.delete(id)
  }

  async edit(body: CategoryEditDTO) {
    await this.categoryRepository.update({ id: body.id }, body)
  }

  all() {
    return this.categoryRepository.find().then(function (result) {
      return result.map(function (entity) {
        const dto = new CategoryEditDTO()
        dto.id = entity.id
        dto.category_name = entity.category_name
        dto.type = entity.type

        return dto
      })
    })
  }
}
