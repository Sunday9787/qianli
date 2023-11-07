<template lang="pug">
n-layout(style="height: inherit")
  LayoutHeader
  n-layout(position="absolute", style="top: 64px; bottom: 0" has-sider)
    LayoutSider
    n-layout(content-style="padding: 24px;" :native-scrollbar="false")
      router-view
</template>

<script lang="ts" setup>
import LayoutHeader from './layout-header.vue'
import LayoutSider from './layout-sider'

defineOptions({ name: 'QianliLayout' })
</script>
./layout-sider.tsx
