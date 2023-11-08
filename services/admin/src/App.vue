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
import { useSystemModule } from './store/modules/system'

const systemModule = useSystemModule()
const colorScheme = usePreferredColorScheme()

if (colorScheme.value !== 'no-preference') {
  systemModule.CHANGE_THEME(colorScheme.value)
}

const theme = computed(function () {
  if (systemModule.theme.mode === 'light') {
    return lightTheme
  }

  return darkTheme
})

systemModule.$subscribe(function (mutation, state) {
  document.documentElement.setAttribute('data-theme', state.theme.mode)
})
</script>
