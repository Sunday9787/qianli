import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProductEntity } from '../product.entity'

/**
 * 产品图片/video
 */
@Entity('qianli_product_file')
export class ProductFileEntity {
  @PrimaryGeneratedColumn()
  id: number

  // @Column({
  //   type: 'integer',
  //   nullable: false,
  //   comment: '0 产品图片 | 1 产品视频 | 2 产品特点 | 3 产品场景 | 4 产品场景 icon'
  // })
  // type: 0 | 1 | 2 | 3 | 4

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 500 })
  path: string

  @Column({ type: 'integer', comment: '产品' })
  product_id: number

  @ManyToOne(() => ProductEntity, product => product.img)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity
}
