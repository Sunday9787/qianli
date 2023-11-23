import { CategoryEntity } from '@/common/category/category.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity('qianli_post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer', comment: '文章分类' })
  category_id: number

  @Column({ type: 'datetime', nullable: true, default: null, comment: '文章发布时间' })
  date: Date

  @CreateDateColumn({ comment: '文章创建时间' })
  created: Date

  @UpdateDateColumn({ comment: '文章更新时间' })
  updated: Date

  /**
   * 文章发布状态 0草稿 1发布
   */
  @Column({ type: 'integer', nullable: false, default: 0, comment: '文章发布状态 0草稿 1发布' })
  status: 0 | 1

  @Column({ type: 'integer', nullable: false, default: 0, comment: '文章浏览量' })
  pv: number

  @Column({ type: 'varchar', nullable: false, length: 255, comment: '文章标题' })
  title: string

  @Column({ type: 'varchar', nullable: false, length: 255, comment: '文章介绍' })
  desc: string

  @Column({ type: 'longtext', nullable: false, comment: '文章内容' })
  content: string

  @Column({ type: 'varchar', nullable: false, length: 255, comment: '文章封面' })
  img: string

  @ManyToOne(() => CategoryEntity, metadata => metadata.post)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity
}
