import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('qianli_layout')
export class LayoutEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'integer', nullable: true, comment: '父级菜单' })
  parent_id: null | number

  @Column({ type: 'varchar', length: 255, comment: '菜单' })
  title: string

  @Column({ type: 'varchar', length: 255, nullable: false, comment: '菜单链接' })
  link: string
}
