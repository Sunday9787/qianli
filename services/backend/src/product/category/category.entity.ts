import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('qianli_product_category')
export class ProductCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: false, length: 50 })
  category_name: string
}
