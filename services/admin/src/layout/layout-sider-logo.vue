<template lang="pug">
.sidebar-logo-container
  transition(name="sidebarLogoFade")
    router-link.sidebar-logo-link(to='/' v-if="collapse" key="collapse")
      h1 Qianli
    router-link.sidebar-logo-link(to='/' key="expand" v-else)
      img.sidebar-logo(:src="logo")

</template>

<script lang="ts" setup>
import logo from '@/assets/logo_dark.png'

interface Props {
  collapse: boolean
}

defineProps<Props>()
</script>

<style lang="less">
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  overflow: hidden;
  line-height: 60px;
  text-align: center;
  background-color: var(--color-logo-background);

  & .sidebar-logo-link {
    width: 100%;
    height: 100%;
    display: block;
    color: #fff;
    font-size: 18px;
    font-weight: bold;

    & .sidebar-logo {
      display: inline-block;
      width: 70%;
      padding: 0 15px;
    }
  }

  &.collapse {
    .sidebar-logo {
      padding: 0 10px;
      margin-right: 0px;
    }
  }
}

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
</style>
