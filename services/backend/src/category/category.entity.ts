import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'qianli_category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: false, length: 255, comment: '分类名称' })
  category_name: string
}
