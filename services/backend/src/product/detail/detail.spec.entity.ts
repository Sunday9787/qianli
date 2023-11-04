import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProductEntity } from '../product.entity'

/**
 * 产品规格
 */
@Entity('qianli_spec')
export class ProductSpecEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer' })
  product_id: number

  @Column({ type: 'varchar', length: 255, nullable: false, comment: '参数label' })
  label: string

  @Column({ type: 'varchar', length: 255, nullable: false, comment: '参数值' })
  value: string

  @ManyToOne(() => ProductEntity, product => product.spec)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity
}
