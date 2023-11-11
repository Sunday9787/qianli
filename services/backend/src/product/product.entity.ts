import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { ProductFeatureEntity } from './detail/detail.feature.entity'
import { ProductScenarioEntity } from './detail/detail.scenario.entity'
import { ProductSpecEntity } from './detail/detail.spec.entity'
import { ProductFileEntity } from './detail/detail.file.entity'
import { CategoryEntity } from '@/common/category/category.entity'

/**
 * 产品特点
 */
@Entity('qianli_product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer', comment: '产品分类' })
  category_id: number

  @ManyToOne(() => CategoryEntity, category => category.product)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity

  @Column({ type: 'varchar', length: 255, nullable: false, comment: '产品标题' })
  title: string

  @Column({ type: 'varchar', length: 255, nullable: false, comment: '产品名称' })
  name: string

  @Column({ type: 'varchar', length: 2000, nullable: false, comment: '产品介绍' })
  detail: string

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '产品视频' })
  media: string | null

  @CreateDateColumn({ comment: '创建时间' })
  created: Date

  @UpdateDateColumn({ comment: '更新时间' })
  updated: Date

  @OneToMany(() => ProductFileEntity, metadata => metadata.product)
  img: ProductFileEntity[]

  @OneToMany(() => ProductFeatureEntity, feature => feature.product)
  feature: ProductFeatureEntity[] | null

  @OneToMany(() => ProductScenarioEntity, scenario => scenario.product)
  scenario: ProductScenarioEntity[] | null

  @OneToMany(() => ProductSpecEntity, spec => spec.product)
  spec: ProductSpecEntity[]
}
