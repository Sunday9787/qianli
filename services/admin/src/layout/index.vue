<template lang="pug">
n-layout(has-sider style="height: inherit")
  LayoutSider

  n-layout
    LayoutHeader

    n-layout-content(content-style="padding: 24px;" :native-scrollbar="false")
      router-view
</template>

<script lang="ts" setup>
import LayoutHeader from './layout-header.vue'
import LayoutSider from './layout-sider'

defineOptions({ name: 'QianliLayout' })
</script>
