<template lang="pug">
app-view(direction='horizontal' class="gap-x-5")
  app-card
    n-menu(:options="menus" v-model:value="currentTab" :indent="18" @update:value="select")

  .flex-1
    component(:is="currentTab")
</template>

<script lang="ts" setup>
import type { MenuOption } from 'naive-ui'
import { useRouter } from 'vue-router'

interface Props {
  id: MenuKey
}

type MenuKey = 'category' | 'department'

defineOptions({
  name: 'QianliSystem',
  components: {
    department: defineAsyncComponent(
      () => import(/* webpackChunkName: "qianli_system_department" */ './department/index.vue')
    ),
    category: defineAsyncComponent(
      () => import(/* webpackChunkName: "qianli_system_category" */ './category/index.vue')
    )
  }
})

const props = withDefaults(defineProps<Props>(), { id: 'category' })
const router = useRouter()

const menus: MenuOption[] = [
  { label: '分类配置', key: 'category' },
  { label: '部门配置', key: 'department' }
]

const currentTab = ref(props.id)

function select(key: MenuKey) {
  router.replace({ query: { id: key } })
}
</script>
