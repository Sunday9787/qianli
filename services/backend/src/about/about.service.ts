import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { LayoutService } from '@/layout/layout.service'
import { AboutEntity } from './about.entity'
import { AboutDTO, AboutEditDTO } from './about.dto'

@Injectable()
export class AboutService {
  constructor(
    @Inject(LayoutService) private layoutService: LayoutService,
    @InjectRepository(AboutEntity) private aboutRepository: Repository<AboutEntity>
  ) {}

  add(body: AboutDTO[]) {
    return this.aboutRepository.save(body)
  }

  edit(body: AboutEditDTO) {
    return this.aboutRepository.update({ id: body.id }, body)
  }

  del(id: number) {
    return this.aboutRepository.delete(id)
  }

  async data() {
    const [about, environment, patent, partner] = await Promise.all([
      this.aboutRepository.findOneByOrFail({ type: 'about' }),
      this.aboutRepository.findBy({ type: 'env' }),
      this.aboutRepository.findBy({ type: 'patent' }),
      this.aboutRepository.findBy({ type: 'partner' })
    ])

    return {
      layout: this.layoutService.layout(),
      about,
      environment,
      patent,
      partner
    }
  }
}
