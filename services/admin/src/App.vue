<template>
  <n-config-provider :locale="zhTW" :theme="theme" style="height: inherit">
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { zhTW, lightTheme, darkTheme } from 'naive-ui'
import { usePreferredColorScheme } from '@vueuse/core'
import { computed } from 'vue'

const colorScheme = usePreferredColorScheme()
const theme = computed(function () {
  if (colorScheme.value === 'light') {
    return lightTheme
  }

  return darkTheme
})
</script>
