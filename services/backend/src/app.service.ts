import { InjectEntityManager } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { LayoutService } from '@/layout/layout.service'
import { PostService } from './post/post.service'
import { ProductEntity } from './product/product.entity'
import { CategoryEntity } from './common/category/category.entity'

class ProductCenterBannerDTO {
  id: number
  title: string
  category_id: number
  category_name: string
  img: string[]
}

function buildProductCenterBannerDTO(data: ProductEntity[]) {
  return data.map(function (product) {
    const dto = new ProductCenterBannerDTO()
    dto.id = product.id
    dto.img = product.img.map(item => item.path)
    dto.category_name = product.category.category_name
    dto.category_id = product.category_id
    dto.title = product.title

    return dto
  })
}

@Injectable()
export class AppService {
  constructor(
    @Inject(LayoutService) private readonly layoutService: LayoutService,
    @Inject(PostService) private readonly postService: PostService,
    @InjectEntityManager() private readonly entityManager: EntityManager
  ) {}

  async data() {
    const [layout, { list: news }, productCenterSeries, productCenterBanner] = await Promise.all([
      this.layoutService.layout({ ghost: ['index'] }),
      this.postService.all({ size: 4, current: 1 }),
      this.entityManager.find(CategoryEntity, { where: { type: 'product' } }),
      this.entityManager
        .find(ProductEntity, { take: 5, relations: { category: true, img: true } })
        .then(buildProductCenterBannerDTO)
    ])

    return {
      layout,
      productBanner: [
        {
          model: 'Cubic 1000',
          title: '过氧化氢灭菌机器人',
          desc: '应用于制药车间洁净区、医院病房、公共消毒场所，单次最大灭菌空间1000m³',
          media: 'picture',
          url: '/upload/20220614162623924193.png'
        },
        {
          media: 'video',
          url: '/upload/2022080911373462f1d67e2fd41.mp4'
        },
        {
          model: 'FHP200',
          title: '便携式过氧化氢灭菌器',
          desc: '实验室、检测室灭菌，灭菌体积200立方米',
          media: 'picture',
          url: '/upload/20220809105908829373.png'
        }
      ],
      solveBanner: [
        { title: '医院', more: '灭菌方案', link: '/', url: '/upload/20220614162623924193.png' },
        { title: '生物制药', more: '灭菌方案', link: '/', url: '/upload/20220614162655906894.png' },
        { title: '实验室', more: '灭菌方案', link: '/', url: '/upload/20220614162729120996.png' },
        { title: '急救中心', more: '灭菌方案', link: '/', url: '/upload/20220614162758407080.png' },
        { title: '公共场所', more: '灭菌方案', link: '/', url: '/upload/20220614162825740490.png' }
      ],
      solveItem: [
        { title: '医院', icon: '/upload/20220614162610115260.png', translate: 'Hospital' },
        { title: '生物制药', icon: '/upload/20220614162610121779.png', translate: 'Biopharmaceutical' },
        { title: '实验室', icon: '/upload/20220614162610114322.png', translate: 'Biopharmaceutical' },
        { title: '急救中心', icon: '/upload/20220614162610114322.png', translate: 'Emergency center' },
        { title: '公共场所', icon: '/upload/20220614162610551710.png', translate: 'Public places' }
      ],
      productCenter: {
        series: productCenterSeries,
        mainBanner: productCenterBanner
      },
      news
    }
  }
}
