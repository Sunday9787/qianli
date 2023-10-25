export class AboutDTO {
  type: 'about' | 'env' | 'patent' | 'partner'
  title?: string
  desc?: string
  img: string
}

export class AboutEditDTO extends AboutDTO {
  id: number
}
