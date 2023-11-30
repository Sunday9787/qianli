<template lang="pug">
main.app-view(:class="['is-' + direction]")
  slot
</template>

<script lang="ts" setup>
interface Props {
  direction?: 'horizontal' | 'vertical'
}

defineOptions({ name: 'AppView' })
withDefaults(defineProps<Props>(), { direction: 'vertical' })
</script>

<style lang="less">
.app-view {
  position: relative;
  display: flex;
  height: 100%;

  &.is-vertical {
    flex-flow: column;
  }

  &.is-horizontal {
    flex-flow: row wrap;
  }
}
</style>
