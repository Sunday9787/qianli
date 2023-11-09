<template lang="pug">
.app-view
  slot
</template>

<script lang="ts" setup>
defineOptions({ name: 'AppView' })
</script>

<style lang="less">
.app-view {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
