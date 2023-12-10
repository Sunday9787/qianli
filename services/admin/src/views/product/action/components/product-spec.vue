<template lang="pug">
section(class="lg:w-5/6 xl:w-3/5 2xl:w-5/6 sm:w-full")
  n-form(ref="formRef" :model="product" :label-width="80" label-placement="left")
    n-h2 产品规格
    n-grid(responsive="screen" cols="s:1 m:2 xl:3 xxl:3" :x-gap="10" :y-gap="10")
      n-grid-item(v-for="(item, k) in product.spec" :key="k" :wrap-item="false")
        n-card(
          :title="`规格${k+1}`"
          :bordered="false"
          :closable="item.closable"
          v-element-hover="(state) => item.closable = state"
          @close="specDel(k)")
          n-form-item(label="标签" :path="`spec[${k}].label`" :rule="{ required: true }")
            n-input(v-model:value="item.label" placeholder="请输入label")
          n-form-item(label="值" :path="`spec[${k}].value`" :rule="{ required: true }")
            n-input(v-model:value="item.value" placeholder="请输入value")
      n-grid-item
        n-space.h-full(align="center")
          n-button(type="primary" @click="specAdd(product.id)") 添加
</template>

<script lang="ts" setup>
import type { FormInst } from 'naive-ui'
import { vElementHover } from '@vueuse/components'
import { ProductEntity } from '@/service/product.entity'

defineOptions({ name: 'ProductSpec' })
defineExpose({ validate, save })

const formRef = ref<FormInst>()
const product = inject<Ref<ProductEntity>>('product')!

function specAdd(id: number) {
  const spec = ProductEntity.spec.create(id)
  product.value.spec.push(spec)
}

function specDel(index: number) {
  product.value.spec.splice(index, 1)
}

function init() {}

function validate() {
  if (!formRef.value) {
    throw new Error('未找到 form')
  }

  return formRef.value.validate()
}

function save() {
  product.value.spec = product.value.spec.filter(function (item) {
    return item.label && item.value
  })
}

init()
</script>
