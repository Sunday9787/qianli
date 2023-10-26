import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('qianli_contact')
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  label: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  value: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  desc: string
}
