export class CategoryDTO {
  category_name: string
  type: 'post' | 'product'
}

export class CategoryEditDTO extends CategoryDTO {
  id: number
}
