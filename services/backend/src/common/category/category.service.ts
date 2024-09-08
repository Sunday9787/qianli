import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'

import { CategoryDTO } from './category.dto'
import { CategoryEntity } from './category.entity'

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(CategoryEntity) private readonly repository: Repository<CategoryEntity>) {}

  async save(body: CategoryDTO) {
    await this.repository.save(body)
  }

  async del(id: number) {
    await this.repository.delete(id)
  }

  all() {
    return this.repository.find().then(function (entity) {
      return plainToInstance(CategoryDTO, entity)
    })
  }
}
