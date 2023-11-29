import { ProductEntity } from '@/service/product.entity'

export function useProduct(props: Utils.ActionProps) {
  const product = ref(new ProductEntity(props.id)) as Ref<ProductEntity>

  if (props.type !== 'add') {
    product.value.detail().then(function (response) {
      product.value = ProductEntity.toInstance(ProductEntity, response)
    })
  }

  return product
}
