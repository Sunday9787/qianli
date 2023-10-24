import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('qianli_department')
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255, comment: '部门名称' })
  department_name: string
}
