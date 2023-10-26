import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { LayoutService } from '@/layout/layout.service'
import { JobService } from '@/job/job.service'
import { ContactEntity } from './contact.entity'
import { ContactFeedbackEntity } from './contact.feedback.entity'
import { ContactDTO, ContactEditDTO } from './contact.dto'
import { ContactFeedbackDTO } from './contact.feedback.dto'

@Injectable()
export class ContactService {
  constructor(
    @Inject(LayoutService) private readonly layoutService: LayoutService,
    @Inject(JobService) private readonly jobService: JobService,
    @InjectRepository(ContactEntity) private readonly contactRepository: Repository<ContactEntity>,
    @InjectRepository(ContactFeedbackEntity) private readonly contactFeedbackRepository: Repository<ContactFeedbackEntity>
  ) {}

  add(body: ContactDTO[]) {
    return this.contactRepository.save(body)
  }

  edit(body: ContactEditDTO) {
    return this.contactRepository.update({ id: body.id }, body)
  }

  del(id: number) {
    return this.contactRepository.delete(id)
  }

  feedback(body: ContactFeedbackDTO) {
    return this.contactFeedbackRepository.save(body)
  }

  async data() {
    const [jobs, contact] = await Promise.all([this.jobService.all(), this.contactRepository.find()])

    return {
      layout: this.layoutService.layout(),
      contact,
      jobs
    }
  }
}
