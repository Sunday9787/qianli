import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProductEntity } from '../product.entity'

/**
 * 产品特点
 */
@Entity('qianli_feature')
export class ProductFeatureEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer' })
  product_id: number

  @Column({ type: 'varchar', length: 255, nullable: false, comment: '产品特点标题' })
  title: string

  @Column({ type: 'varchar', length: 255, nullable: true, default: '', comment: '产品特点描述' })
  desc: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  img: string

  @ManyToOne(() => ProductEntity, product => product.feature)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity
}
