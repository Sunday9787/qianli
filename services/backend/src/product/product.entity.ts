import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProductCategoryEntity } from './category/category.entity'

@Entity('qianli_product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer', nullable: false, comment: '产品分类' })
  category_id: number

  @Column({ type: 'varchar', length: 255, comment: '产品名称' })
  title: string

  @Column({ type: 'varchar', length: 255, comment: '产品型号' })
  desc: string

  @Column({ type: 'varchar', length: 255 })
  img: string

  @OneToMany(() => ProductCategoryEntity, metadata => metadata.category_name)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id', foreignKeyConstraintName: 'id' })
  category_name: string
}
