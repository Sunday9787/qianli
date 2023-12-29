<template lang="pug">
n-layout(has-sider style="height: inherit")
  LayoutSider

  n-layout
    LayoutHeader

    LayoutTagsView

    n-layout-content(:style="layoutStyle" contentClass="layout-content" :native-scrollbar="false")
      router-view

n-affix.layout-affix(@click="drawerShow = true")
  n-button(type="primary")
    n-icon(:size="25")
      DisplaySettingsFilled

n-drawer(v-model:show="drawerShow")
  n-drawer-content(title="系统配置")
    n-space(justify="space-between" align="center")
      label 缓存
      n-button(size="small" type='info' :loading="cacheModule.loading" @click="refresh()") 刷新缓存
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { useCacheModule } from '@/store/modules/cache'
import { DisplaySettingsFilled } from '@vicons/material'
import LayoutTagsView from './layout-tags-view.vue'
import LayoutHeader from './layout-header.vue'
import LayoutSider from './layout-sider'

defineOptions({ name: 'QianliLayout' })

const cacheModule = useCacheModule()
const drawerShow = ref(false)
const message = useMessage()
const layoutStyle: CSSProperties = { height: 'calc(100% - 46px - 60px)' }

async function refresh() {
  await cacheModule.cache()
  message.success('刷新成功')
}
</script>

<style lang="less">
.layout-content {
  padding: 24px;
  height: 100%;
  background-color: var(--color-background);
}

.layout-affix {
  position: fixed;
  z-index: 99;
  right: 20px;
  top: 50%;
}
</style>
