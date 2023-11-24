import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('qianli_feedback')
export class FeedbackEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar', nullable: false, length: 20, comment: '用户称呼' })
  name: string
  @Column({ type: 'integer', nullable: false, default: 0, comment: '0未处理 1已处理' })
  status: 0 | 1
  @Column({ type: 'varchar', nullable: false, length: 50, comment: '联系方式' })
  contact: string
  @Column({ type: 'varchar', nullable: false, length: 20, comment: '地区' })
  area: string
  @Column({ type: 'varchar', nullable: false, length: 500, comment: '反馈消息' })
  message: string
}
