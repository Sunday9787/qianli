<template lang="pug">
app-card(type="flex" direction="vertical" flex1)
  slot
</template>

<script lang="ts" setup>
defineOptions({ name: 'AppDataView' })
</script>
