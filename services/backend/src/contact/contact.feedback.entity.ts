import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('qianli_contact_feedback')
export class ContactFeedbackEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100, nullable: false, comment: '姓名' })
  name: string

  @Column({ type: 'varchar', length: 100, nullable: false, comment: '联系方式' })
  contact: string

  @Column({ type: 'varchar', length: 100, nullable: false, comment: '地区' })
  area: string

  @Column({ type: 'varchar', length: 1000, nullable: false, comment: '留言' })
  message: string
}
