export class ProductSpecDTO {
  label: string
  value: string
}

export class ProductSpecEditDTO extends ProductSpecDTO {
  id: number
}
