<template lang="pug">
app-view
  app-card.p-10(type="flex" direction="vertical" flex1)
    n-steps(:current="step")
      n-step(:internal-index="1" title="基本信息")
      n-step(:internal-index="2" title="产品图片")
      n-step(:internal-index="3" title="产品规格")

    n-space(justify="center" vertical :wrap-item="false" class="flex-1 mt-10 overflow-hidden")
      .flex-1.h-full.overflow-y-auto
        keep-alive
          component.m-auto(:is="current" ref="stepInst")

      n-hr
      n-space(justify="center" :wrap-item="false")
        n-button(@click="$router.back()" v-show="step ===1") 取消
        n-button(type="info" @click="prevStep()" v-show="step !==1") 上一步
        n-button(type="primary" :loading="nextStepLoading" @click="nextStep()" v-show="step !==3") 下一步
        n-button(type="primary" @click="save()" v-show="step ===3") 保存
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useProduct } from '@/views/product/hooks'
import ProductBase from './components/product-base.vue'
import ProductSpec from './components/product-spec.vue'
import ProductDetail from './components/product-detail.vue'

interface Props {
  id: number
  type: Utils.ActionType
}

type ComponentType = 'ProductBase' | 'ProductDetail' | 'ProductSpec'
type StepInst = { validate(): Promise<void>; save(): void }

defineOptions({
  name: 'QianliProductAction',
  components: { ProductBase, ProductDetail, ProductSpec }
})

const props = defineProps<Props>()

const componentMap = new Map<number, ComponentType>([
  [1, 'ProductBase'],
  [2, 'ProductDetail'],
  [3, 'ProductSpec']
])
const product = useProduct(props)
const step = ref(1)
const nextStepLoading = ref(false)
const stepInst = ref<StepInst>()
const router = useRouter()

const current = computed<ComponentType>({
  get() {
    return componentMap.get(step.value)!
  },
  set(val) {
    console.log('current set', val)
  }
})

async function nextStep() {
  nextStepLoading.value = true

  if (!stepInst.value) {
    throw new Error('stepInst 未找到')
  }

  try {
    await stepInst.value.validate()
    stepInst.value.save()
    step.value += 1
  } finally {
    nextStepLoading.value = false
  }
}

function prevStep() {
  step.value -= 1
}

async function save() {
  if (!stepInst.value) {
    throw new Error('stepInst 未找到')
  }

  stepInst.value.save()
  await product.value.save()
  router.back()
}

provide('product', product)
</script>
