import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm'
import { ProductEntity } from '../product.entity'

/**
 * 产品场景
 */
@Entity('qianli_scenario')
export class ProductScenarioEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer' })
  product_id: number

  @Column({ type: 'varchar', length: 255, nullable: false, comment: '场景标题' })
  text: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  img: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  icon: string

  @ManyToOne(() => ProductEntity, product => product.scenario)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity
}
