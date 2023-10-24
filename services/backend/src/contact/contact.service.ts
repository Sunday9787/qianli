import { Inject, Injectable } from '@nestjs/common'
import { LayoutService } from '@/layout/layout.service'
import { JobService } from '@/job/job.service'

@Injectable()
export class ContactService {
  constructor(
    @Inject(LayoutService) private readonly layoutService: LayoutService,
    @Inject(JobService) private readonly jobService: JobService
  ) {}

  async data() {
    const jobs = await this.jobService.all()

    return {
      layout: this.layoutService.layout(),
      contact: [
        {
          label: '服务热线',
          value: '0571-87705098',
          desc: '总机'
        },
        {
          label: '企业邮箱',
          value: 'sales@qianlibio.com',
          desc: '市场部'
        },
        {
          label: '公司地址',
          value: '浙江省杭州市西湖区转塘街道浮山街德力西园区',
          desc: '总部'
        },
        {
          label: '手机号',
          value: '13396596608',
          desc: ''
        }
      ],
      jobs
    }
  }
}
