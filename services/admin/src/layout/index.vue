<template lang="pug">
n-layout(has-sider style="height: inherit")
  LayoutSider

  n-layout
    LayoutHeader

    n-layout-content(:style="layoutStyle" :scrollbar-props="{contentClass: 'layout-content'}" :native-scrollbar="false")
      router-view
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import LayoutHeader from './layout-header.vue'
import LayoutSider from './layout-sider'

defineOptions({ name: 'QianliLayout' })

const layoutStyle: CSSProperties = { height: 'calc(100% - 60px)' }
</script>

<style lang="less">
.layout-content {
  padding: 24px;
  height: 100%;
  background-color: var(--color-background);
}
</style>
