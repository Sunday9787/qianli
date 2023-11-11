<template lang="pug">
section.app-card(:class=`{
  'flex-1': flex1,
  'app-card--flex': type === 'flex',
  'app-card--vertical': direction === 'vertical',
  'app-card--horizontal': direction === 'horizontal'
}`)
  slot
</template>

<script lang="ts" setup>
interface Props {
  type?: 'flex'
  flex1?: boolean
  direction?: 'vertical' | 'horizontal'
}

defineOptions({ name: 'AppCard' })
defineProps<Props>()
</script>

<style lang="less">
.app-card {
  padding: 16px;
  overflow: hidden;
  background-color: var(--color-background-2);
  border-radius: 10px;

  & + & {
    margin-top: 8px;
  }

  &--flex {
    display: flex;
  }

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }
}
</style>
