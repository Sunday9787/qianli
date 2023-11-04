import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PostEntity } from '@/post/post.entity'
import { ProductEntity } from '@/product/product.entity'

@Entity('qianli_category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: false, length: 50 })
  category_name: string

  @Column({ type: 'varchar', nullable: false, comment: '分类类型' })
  type: 'post' | 'product'

  @OneToMany(() => PostEntity, post => post.category)
  post: PostEntity[]

  @OneToMany(() => ProductEntity, product => product.category)
  product: ProductEntity[]
}
