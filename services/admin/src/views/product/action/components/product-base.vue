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
      n-form-item(label="产品视频" path="media")
        n-upload(
          :accept="ACCEPT.video"
          :max="1"
          :custom-request="product.uploadFile"
          v-model:file-list="productMedia"
          list-type="text")
          n-button(type="primary") 点击上传
</template>

<script lang="ts" setup>
import type { FormInst, UploadFileInfo } from 'naive-ui'
import { watchOnce } from '@vueuse/core'
import { ProductEntity } from '@/service/product.entity'
import { useCacheModule } from '@/store/modules/cache'
import { ACCEPT } from '@/utils/constant'

defineOptions({ name: 'ProductBase' })
defineExpose({ validate, save })

const formRef = ref<FormInst>()
const product = inject<Ref<ProductEntity>>('product')!
const cacheModule = useCacheModule()

const productMedia = ref<UploadFileInfo[]>([])
const formRule: FormRule<Pick<ProductEntity, 'desc' | 'category_id' | 'title' | 'name'>> = {
  desc: { required: true },
  category_id: { required: true },
  title: { required: true },
  name: { required: true }
}

watchOnce(() => product.value, init)

function validate() {
  if (!formRef.value) {
    throw new Error('未找到 form')
  }

  return formRef.value.validate()
}

function init() {
  if (product.value.media) {
    productMedia.value.push({
      url: product.value.media,
      id: String(product.value.id),
      name: product.value.media,
      status: 'finished'
    })
  }
}

function save() {
  if (productMedia.value.length) {
    const [media] = productMedia.value
    product.value.media = media.url!
  }
}
</script>
