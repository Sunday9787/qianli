export class PostDTO {
  category_id: number
  date: Date
  pv: number
  title: string
  desc: string
  content: string
  img: string
}

export class PostEditDTO extends PostDTO {
  id: number
}
