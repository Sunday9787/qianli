import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('qianli_about')
export class AboutEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 20, nullable: false, comment: '对应 关于我们 公司环境 专利 合作伙伴' })
  type: 'about' | 'env' | 'patent' | 'partner'

  @Column({ type: 'varchar', length: 255, nullable: true })
  title?: string

  @Column({ type: 'varchar', length: 2000, nullable: true })
  desc: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  img: string
}
