import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('qianli_product_detail')
export class ProductDetailEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer', nullable: false, comment: '产品系列' })
  family_id: number

  @Column({ type: 'varchar', length: 500, nullable: false, comment: '产品功能' })
  function: string

  @Column({ type: 'integer', nullable: false, comment: '产品相册' })
  album_id: number

  @Column({ type: 'integer', nullable: false, comment: '产品特点' })
  feature_id: number

  @Column({ type: 'integer', nullable: false, comment: '应用场景' })
  scop_id: number

  @Column({ type: 'integer', nullable: false, comment: '产品参数' })
  model_id: number
}
