<template>
  <n-config-provider :locale="zhTW" :theme="theme" :theme-overrides="themeOverride" style="height: inherit">
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { zhTW, lightTheme, darkTheme, type GlobalThemeOverrides } from 'naive-ui'
import { usePreferredColorScheme } from '@vueuse/core'
import { useSystemModule, type ThemeMode } from './store/modules/system'

const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: 'rgb(121,107,175)'
  }
}

const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: 'rgb(121,107,175)'
  }
}

const systemModule = useSystemModule()
const colorScheme = usePreferredColorScheme()

const themeOverride = computed(function () {
  return systemModule.theme.mode === 'light' ? lightThemeOverrides : darkThemeOverrides
})

const theme = computed(function () {
  if (systemModule.theme.mode === 'light') {
    return lightTheme
  }

  return darkTheme
})

watch(
  () => colorScheme.value,
  function (value) {
    if (colorScheme.value !== 'no-preference') {
      systemModule.CHANGE_THEME(value as ThemeMode)
    }
  }
)

systemModule.$subscribe(function (mutation, state) {
  document.documentElement.setAttribute('data-theme', state.theme.mode)
})
</script>
