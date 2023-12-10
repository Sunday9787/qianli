<template lang="pug">
section(class="lg:w-5/6 xl:w-3/5 2xl:w-5/6 md:w-11/12 sm:w-full")
  n-form(ref="formRef" :model="product" :label-width="80" label-placement="left")
    n-h2 产品主图
    n-form-item(path="img")
      n-upload(
        :accept="ACCEPT.picture"
        :max="10"
        :custom-request="product.upload"
        v-model:file-list="coversProduct"
        list-type="image-card") 点击上传

    n-h2 产品特点
    n-grid(responsive="screen" cols="s:1 m:2 xl:3 xxl:3" :x-gap="10" :y-gap="10")
      n-grid-item(v-for="(item, k) in product.feature" :key="k" :wrap-item="false")
        n-card(
          :title="`特点${k+1}`"
          :bordered="false"
          :closable="item.closable"
          v-element-hover="(state) => item.closable = state"
          @close="featureDel(k)")
          n-form-item(label="标题" :path="`feature[${k}].title`" :rule="{ required: true }")
            n-input(v-model:value="item.title" placeholder="请输入标题")
          n-form-item(label="描述" :path="`feature[${k}].desc`" :rule="{ required: false }")
            n-input(v-model:value="item.desc" placeholder="请输入描述")
          n-form-item(label="图片" :path="`feature[${k}].img`" :rule="{ required: false }")
            n-upload(
              :accept="ACCEPT.picture"
              :max="1"
              :custom-request="product.upload"
              v-model:file-list="coversFeatureMap[item.fileId]"
              list-type="image-card") 点击上传
      n-grid-item
        n-space.h-full(align="center")
          n-button(type="primary" @click="featureAdd(product.id)") 添加

    n-h2 应用场景
    n-grid(responsive="screen" cols="s:1 m:2 xl:3 xxl:3" :x-gap="10" :y-gap="10")
      n-grid-item(v-for="(item, k) in product.scenario" :key="item.fileId" :wrap-item="false")
        n-card(
          :title="`场景${k+1}`"
          :bordered="false"
          :closable="item.closable"
          v-element-hover="(state) => item.closable = state"
          @close="scenarioDel(k)")
          n-form-item(label="场景描述" :path="`scenario[${k}].text`" :rule="{ required: true }")
            n-input(v-model:value="item.text" placeholder="请输入场景描述")
          n-form-item(label="图标" :path="`scenario[${k}].icon`" :rule="{ required: true }")
            n-upload(
              :accept="ACCEPT.picture"
              :max="1"
              :custom-request="product.upload"
              v-model:file-list="coversScenarioMap[item.fileId].icon"
              list-type="image-card") 点击上传
          n-form-item(label="图片" :path="`scenario[${k}].img`" :rule="{ required: true }")
            n-upload(
              :accept="ACCEPT.picture"
              :max="1"
              :custom-request="product.upload"
              v-model:file-list="coversScenarioMap[item.fileId].img"
              list-type="image-card") 点击上传
      n-grid-item
        n-space.h-full(align="center")
          n-button(type="primary" @click="scenarioAdd(product.id)") 添加
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import type { FormInst, UploadFileInfo } from 'naive-ui'
import { vElementHover } from '@vueuse/components'
import { ProductEntity } from '@/service/product.entity'
import { ProductImgEntity } from '@/service/product.img.entity'
import { ACCEPT } from '@/utils/constant'

defineOptions({ name: 'ProductDetail' })
defineExpose({ validate, save })

const formRef = ref<FormInst>()
const product = inject<Ref<ProductEntity>>('product')!

const coversFeatureMap = reactive<Record<symbol, UploadFileInfo[]>>(Object.create(null))
const coversScenarioMap = reactive<Record<symbol, { img: UploadFileInfo[]; icon: UploadFileInfo[] }>>(
  Object.create(null)
)
const coversProduct = ref<UploadFileInfo[]>([])

function featureAdd(id: number) {
  const feature = ProductEntity.feature.create(id)
  coversFeatureMap[feature.fileId] = []
  product.value.feature.push(feature)
}

function scenarioAdd(id: number) {
  const scenario = ProductEntity.scenario.create(id)
  coversScenarioMap[scenario.fileId] = { img: [], icon: [] }
  product.value.scenario.push(scenario)
}

function init() {
  for (const item of product.value.img) {
    coversProduct.value.push({
      url: item.path,
      id: String(item.id),
      name: item.path,
      status: 'finished'
    })
  }

  for (const item of product.value.feature) {
    coversFeatureMap[item.fileId] = [
      {
        url: item.img,
        id: String(item.id),
        name: item.img,
        status: 'finished'
      } as UploadFileInfo
    ]
  }

  for (const item of product.value.scenario) {
    coversScenarioMap[item.fileId] = {
      img: [
        {
          url: item.img,
          id: String(item.id),
          name: item.img,
          status: 'finished'
        }
      ],
      icon: [
        {
          url: item.icon,
          id: String(item.id),
          name: item.icon,
          status: 'finished'
        }
      ]
    }
  }
}

function featureDel(index: number) {
  const [del] = product.value.feature.splice(index, 1)
  delete coversFeatureMap[del.fileId]
}

function scenarioDel(index: number) {
  const [del] = product.value.scenario.splice(index, 1)
  delete coversScenarioMap[del.fileId]
}

function validate() {
  if (!formRef.value) {
    throw new Error('未找到 form')
  }

  save()

  return formRef.value.validate()
}

function save() {
  product.value.img = coversProduct.value.map(function (item) {
    const img = new ProductImgEntity(product.value.id)
    const id = Number(item.id)

    img.id = Number.isNaN(id) ? 0 : id
    img.path = item.url!
    return img
  })

  for (const item of product.value.feature) {
    const [img] = coversFeatureMap[item.fileId]
    item.img = img.url!
  }

  for (const item of product.value.scenario) {
    const {
      icon: [icon],
      img: [img]
    } = coversScenarioMap[item.fileId]
    item.icon = icon.url!
    item.img = img.url!
  }
}

init()
</script>
