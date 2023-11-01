import { Entity } from 'typeorm'

@Entity('qianli_detail')
export class DetailEntity {
  id: number
  category: string
  title: string
  name: string
  detail: string
  img: string[]
  media: string | null
  feature: Array<{ img: string; title: string; desc: string }> | null
  env: Array<{ icon: string; img: string; text: string }> | null
  spec: Array<{ label: string; value: string }>
}
