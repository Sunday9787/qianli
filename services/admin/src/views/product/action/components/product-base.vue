<template lang="pug">
section(class="lg:w-5/6 xl:w-3/5 2xl:w-4/6 sm:w-full")
  n-form(ref="formRef" :model="product" :rules="formRule" inline :label-width="100" label-placement="left")
    n-space.flex-1(vertical)
      n-form-item(label="产品标题" path="title")
        n-input(v-model:value="product.title")
      n-form-item(label="产品名称" path="name")
        n-input(v-model:value="product.name")
      n-form-item(label="产品分类" path="category_id")
        n-select(
          :options="cacheModule.optionsProductCategory"
          v-model:value="product.category_id"
          label-field="category_name"
          value-field="id")
      n-form-item(label="产品描述" path="desc")
        n-input(v-model:value="product.desc" type="textarea" :rows="14")
</template>

<script lang="ts" setup>
import type { FormInst } from 'naive-ui'
import { ProductEntity } from '@/service/product.entity'
import { useCacheModule } from '@/store/modules/cache'

defineOptions({ name: 'ProductBase' })
defineExpose({ validate, save })

const formRef = ref<FormInst>()
const product = inject<Ref<ProductEntity>>('product')!
const cacheModule = useCacheModule()

const formRule: FormRule<Pick<ProductEntity, 'desc' | 'category_id' | 'title' | 'name'>> = {
  desc: { required: true },
  category_id: { required: true },
  title: { required: true },
  name: { required: true }
}

function validate() {
  if (!formRef.value) {
    throw new Error('未找到 form')
  }

  return formRef.value.validate()
}

function save() {}
</script>
