<template lang="pug">
app-view(direction='horizontal' class="gap-x-5")
  app-card
    n-menu(:options="menus" v-model:value="currentTab" :indent="18")

  .flex-1
    component(:is="currentTab")
</template>

<script lang="ts" setup>
import { type MenuOption } from 'naive-ui'

defineOptions({
  name: 'QianliSystem',
  components: {
    QianliSystemDepartment: defineAsyncComponent(() => import('./department/index.vue')),
    QianliSystemCategory: defineAsyncComponent(() => import('./category/index.vue'))
  }
})

const menus: MenuOption[] = [
  { label: '分类配置', key: 'QianliSystemCategory' },
  { label: '部门配置', key: 'QianliSystemDepartment' }
]

const currentTab = ref('QianliSystemCategory')
</script>
