import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('qianli_user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: false, comment: '用户邮箱' })
  email: string

  @Column({ type: 'varchar', nullable: false, comment: '用户名' })
  username: string

  @Column({ type: 'varchar', nullable: false, select: false, comment: '密码' })
  password: string

  @Column({ type: 'varchar', nullable: true })
  avatar: string

  @CreateDateColumn()
  created: Date

  @UpdateDateColumn()
  updated: Date
}
