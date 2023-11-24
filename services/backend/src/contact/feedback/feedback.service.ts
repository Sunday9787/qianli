import { Like, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QianliQuery } from '@/class/query'
import { FeedbackEntity } from './feedback.entity'
import { FeedbackDTO, FeedbackQueryDTO } from './feedback.dto'

function buildFeedbackDTO(entity: FeedbackEntity) {
  const dto = new FeedbackDTO()
  dto.id = entity.id
  dto.name = entity.name
  dto.area = entity.area
  dto.contact = entity.contact
  dto.message = entity.message
  dto.status = entity.status
  return dto
}

@Injectable()
export class FeedbackService {
  constructor(@InjectRepository(FeedbackEntity) private readonly feedbackRepository: Repository<FeedbackEntity>) {}

  async save(body: FeedbackDTO) {
    await this.feedbackRepository.save(body)
  }

  async process(id: number) {
    await this.feedbackRepository.update({ id }, { status: 1 })
  }

  all(query: FeedbackQueryDTO) {
    const qianliQuery = new QianliQuery(query, function (item: FeedbackEntity) {
      return buildFeedbackDTO(item)
    })

    return this.feedbackRepository
      .findAndCount({
        where: {
          name: query.name ? Like(`%${query.name}%`) : null,
          area: query.area ? Like(`%${query.area}%`) : null,
          contact: query.contact ? Like(`%${query.contact}%`) : null,
          message: query.message ? Like(`%${query.message}%`) : null
        },
        ...qianliQuery.option
      })
      .then(function (result) {
        return qianliQuery.data(result)
      })
  }
}
