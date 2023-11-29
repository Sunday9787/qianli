<template lang="pug">
app-view
  app-card.overflow-y-auto
    n-space(:wrap-item="false" vertical)
      ProductBaseBlock(:data="detail")
      ProductBlock(type="img" :img="detail.img")
      ProductBlock(type="feature" :feature="detail.feature")
      ProductBlock(type="scenario" :scenario="detail.scenario")
</template>

<script lang="ts" setup>
import { ProductBlock, ProductBaseBlock } from '@/views/product/components/product-block'
import { useProduct } from '@/views/product/hooks'

interface Props {
  id: number
}

defineOptions({ name: 'QianliProductDetail' })
const props = defineProps<Props>()

const detail = useProduct({ type: 'detail', id: props.id })
</script>
