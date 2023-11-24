import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Inject, Injectable } from '@nestjs/common'
import { LayoutService } from '@/layout/layout.service'
import { JobService } from '@/job/job.service'
import { ContactEntity } from './contact.entity'
import { ContactDTO, ContactEditDTO } from './contact.dto'

@Injectable()
export class ContactService {
  constructor(
    @Inject(LayoutService)
    private readonly layoutService: LayoutService,
    @Inject(JobService)
    private readonly jobService: JobService,
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>
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

  async data() {
    const [layout, jobs, contact] = await Promise.all([
      this.layoutService.layout(),
      this.jobService.all(),
      this.contactRepository.find()
    ])

    return {
      layout,
      contact,
      jobs
    }
  }
}
