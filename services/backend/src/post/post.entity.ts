import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { PostCategoryEntity } from './category/category.entity'

@Entity('qianli_post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer', comment: '文章分类' })
  category_id: number

  @Column({ type: 'datetime', nullable: false, comment: '文章发布时间' })
  date: Date

  @Column({ type: 'integer', nullable: false, comment: '文章浏览量' })
  pv: number

  @Column({ type: 'varchar', nullable: false, length: 255, comment: '文章标题' })
  title: string

  @Column({ type: 'varchar', nullable: false, length: 255, comment: '文章介绍' })
  desc: string

  @Column({ type: 'longtext', nullable: false, comment: '文章内容' })
  content: string

  @Column({ type: 'varchar', nullable: false, length: 255, comment: '文章封面' })
  img: string

  @OneToOne(() => PostCategoryEntity, metadata => metadata.category_name)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category_name: string
}
