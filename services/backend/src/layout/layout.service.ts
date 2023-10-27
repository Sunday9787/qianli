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

function transform(data: LayoutEntity[]) {
  const map = new Map<number, MenuDTO>(
    data.map(function (item) {
      const value = new MenuDTO()
      value.id = item.id
      value.link = item.link
      value.title = item.title
      value.parent_id = item.parent_id
      value.children = []

      return [item.id, value]
    })
  )

  for (const item of data) {
    if (item.parent_id) {
      map.get(item.parent_id).children.push(item)
    }
  }

  return Array.from(map.values()).filter(item => item.parent_id === null)
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
    const menus = transform(response)

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
