export class ProductFeatureDTO {
  title: string
  desc: string
  img: string
}

export class ProductFeatureEditDTO extends ProductFeatureDTO {
  id: number
}
