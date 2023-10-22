import { Entity } from 'typeorm'

@Entity()
export class PostEntity {
  id: number
  category: string
  date: string
  pv: number
  title: string
  desc: string
  content: string
  img: string
}
