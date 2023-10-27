export class LayoutDTO {
  parent_id: null | number
  title: string
  link: string
}

export class LayoutEditDTO extends LayoutDTO {
  id: number
}
