<template lang="pug">
n-layout-header.layout-header(bordered)
  a.layout-item(href="javascript:;" @click="systemModule.TOGGLE_SIDEBAR")
    n-icon(size="24")
      MenuOpenFilled(v-if="systemModule.sidebar.collapse")
      MenuFilled(v-else)

  n-breadcrumb
    transition-group(name="breadcrumb")
      n-breadcrumb-item(
        v-for="item of route.matched"
        :key="item.name"
        :href="route.matched.at(-1) === item ? 'javascript:;': item.path")
        n-icon(:size="22" v-if="item.meta.icon")
          component(:is="item.meta.icon")
        | {{ item.meta.title }}

  .flex-1

  n-space(:wrap="false" :wrap-item="false")
    nav.flex
      a.layout-item(href="javascript:;" @click="systemModule.TOGGLE_THEME")
        n-icon(size="24")
          NightlightRoundFilled(v-if="systemModule.isLightTheme")
          LightModeRound(v-else)

      a.layout-item(href="javascript:;" :class="{ active: isFullscreen }" @click="toggle")
        n-icon(size="24")
          FullscreenExitRound(v-if="isFullscreen")
          FullscreenRound(v-else)

      n-dropdown(trigger="click" :options="menuOptions" @select="selectItem")
        a.layout-item(href="javascript:;")
          n-avatar(size="medium" round :src="userModule.avatar")
          | &nbsp;{{ userModule.username }}
</template>

<script lang="ts" setup>
import type { DropdownOption } from 'naive-ui'
import {
  MenuFilled,
  MenuOpenFilled,
  FullscreenRound,
  FullscreenExitRound,
  LightModeRound,
  NightlightRoundFilled
} from '@vicons/material'
import { useSystemModule } from '@/store/modules/system'
import { useUserModule } from '@/store/modules/user'
import { useFullscreen } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'

type DropdownMenuKey = 'logout'

defineOptions({ name: 'QianliLayoutHeader' })

const router = useRouter()
const route = useRoute()
const systemModule = useSystemModule()
const userModule = useUserModule()
const { isFullscreen, toggle } = useFullscreen()

const menuOptions: DropdownOption[] = [{ label: '退出系统', key: 'logout' }]

async function selectItem(key: DropdownMenuKey) {
  switch (key) {
    case 'logout':
      await userModule.logOut()
      router.replace('/login')
      break
  }
}
</script>

<style lang="less">
.layout-header {
  display: flex;
  height: 60px;
  align-items: center;
}

.layout-item {
  display: flex;
  height: 100%;
  padding: 1px 10px 0;
  align-items: center;
  transition: background 0.2s;

  &.active,
  &:hover {
    background-color: var(--layout-item-hover);
  }
}
</style>
