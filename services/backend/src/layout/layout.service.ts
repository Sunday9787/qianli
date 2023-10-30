import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import manifest from 'backend/manifest.json'
import dayjs from 'dayjs'
import { LayoutEntity } from './layout.entity'
import { LayoutDTO, LayoutEditDTO } from './layout.dto'

interface LayoutServiceOption {
  ghost: string[]
}

class MenuDTO extends LayoutEntity {
  children: LayoutEntity[]
}

function buildMenu(data: LayoutEntity[], parentId: null | number) {
  const result: MenuDTO[] = []
  for (const item of data) {
    if (item.parent_id === parentId) {
      const menu = new MenuDTO()
      menu.id = item.id
      menu.parent_id = item.parent_id
      menu.title = item.title
      menu.link = item.link
      menu.children = buildMenu(data, item.id)
      result.push(menu)
    }
  }

  return result
}

@Injectable()
export class LayoutService {
  constructor(@InjectRepository(LayoutEntity) private layoutRepository: Repository<LayoutEntity>) {}

  add(body: LayoutDTO) {
    return this.layoutRepository.save(body)
  }

  edit(body: LayoutEditDTO) {
    return this.layoutRepository.update({ id: body.id }, body)
  }

  del(id: number) {
    return this.layoutRepository.delete(id)
  }

  async layout(option?: LayoutServiceOption) {
    const response = await this.layoutRepository.find()
    const menus = buildMenu(response, null)

    return {
      manifest,
      helper: {
        dayjs
      },
      isIndex: option?.ghost.includes('index'),
      isNews: option?.ghost.includes('news'),
      menus
    }
  }
}
