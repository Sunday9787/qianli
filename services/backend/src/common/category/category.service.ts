import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CategoryEntity } from './category.entity'
import { CategoryDTO } from './category.dto'

function buildDTO(entity: CategoryEntity) {
  const dto = new CategoryDTO()
  dto.id = entity.id
  dto.category_name = entity.category_name
  dto.type = entity.type

  return dto
}

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>) {}

  async save(body: CategoryDTO) {
    await this.categoryRepository.save(body)
  }

  async del(id: number) {
    await this.categoryRepository.delete(id)
  }

  all() {
    return this.categoryRepository.find().then(function (result) {
      return result.map(buildDTO)
    })
  }
}
