import { DepartmentEntity } from '@/common/department/department.entity'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('qianli_job')
export class JobEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255, comment: '岗位' })
  title: string

  @Column({ type: 'integer', comment: '招聘人数' })
  num: number

  @Column({ type: 'integer', comment: '招聘部门' })
  department_id: number

  @Column({ type: 'varchar', comment: '招聘城市' })
  city: string

  @Column({ type: 'varchar', length: 1000, comment: '招聘要求' })
  requirement: string

  @Column({ type: 'varchar', length: 1000, comment: '岗位职责' })
  responsibility: string

  @OneToOne(() => DepartmentEntity, metadata => metadata.department_name)
  @JoinColumn({ name: 'department_id', referencedColumnName: 'id' })
  department_name: string
}
