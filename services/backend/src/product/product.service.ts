import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { LayoutService } from '@/layout/layout.service'
import { CategoryService } from './category/category.service'
import { ProductEntity } from './product.entity'
import { ProductCategoryEntity } from './category/category.entity'
import { ProductDTO, ProductEditDTO } from './product.dto'

class RenderDTO extends ProductCategoryEntity {
  data: ProductEntity[]
}

const sql = `
  product.id,
  product.category_id,
  product.title,
  product.desc,
  product.img,
  category.category_name
`

@Injectable()
export class ProductService {
  constructor(
    @Inject(LayoutService) private layoutService: LayoutService,
    @Inject(CategoryService) private categoryService: CategoryService,
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>
  ) {}

  all() {
    return this.productRepository
      .createQueryBuilder('product')
      .innerJoin(ProductCategoryEntity, 'category', 'category.id = product.category_id')
      .select(sql)
      .getRawMany<ProductEntity>()
  }

  add(body: ProductDTO) {
    return this.productRepository.save(body)
  }

  edit(body: ProductEditDTO) {
    return this.productRepository.update({ id: body.id }, body)
  }

  del(id: number) {
    return this.productRepository.delete(id)
  }

  async data() {
    const [layout, categories, products] = await Promise.all([
      this.layoutService.layout(),
      this.categoryService.all(),
      this.productRepository.find()
    ])
    const productMap = new Map<number, ProductEntity[]>(categories.map(item => [item.id, []]))

    for (const item of products) {
      productMap.get(item.category_id).push(item)
    }

    const product: RenderDTO[] = categories.map(function (category) {
      const item = new RenderDTO()
      item.id = category.id
      item.category_name = category.category_name
      item.data = productMap.get(category.id)
      return item
    })

    return {
      layout,
      product
    }
  }
}
