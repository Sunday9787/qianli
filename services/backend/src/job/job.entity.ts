import { AbstractEntity } from '@/class/abstract.entity'
import { DepartmentEntity } from '@/common/department/department.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity('qianli_job')
export class JobEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255, comment: '岗位' })
  title: string

  @Column({ type: 'integer', comment: '招聘人数' })
  num: number

  @Column({ type: 'integer', default: 0, comment: '职位状态 0未发布 1已发布' })
  status: 0 | 1

  @Column({ type: 'integer', comment: '招聘部门' })
  department_id: number

  @Column({ type: 'varchar', comment: '招聘城市' })
  city: string

  @Column({ type: 'varchar', length: 1000, comment: '招聘要求' })
  requirement: string

  @Column({ type: 'varchar', length: 1000, comment: '岗位职责' })
  responsibility: string

  @ManyToOne(() => DepartmentEntity, department => department.job)
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity

  @UpdateDateColumn({ comment: '职位更新时间' })
  created: Date

  @CreateDateColumn({ comment: '职位创建时间' })
  updated: Date
}
