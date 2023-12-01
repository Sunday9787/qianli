<template lang="pug">
n-layout(has-sider style="height: inherit")
  LayoutSider

  n-layout
    LayoutHeader

    .layout-tags-view
      n-scrollbar(x-scrollable)
        .tags-view
          n-tag(
            v-for="tag of tagViews"
            :type="currentTag === tag ? 'primary': 'default'"
            :key="tag.name"
            size="large"
            style="cursor: pointer;"
            @click="$router.push(tag.path)"
            @contextmenu.prevent="(e) => tagHandleContextMenu(e, tag)")
            n-icon(:size="16")
              component(:is="tag.icon")
            | {{ tag.title }}

      n-dropdown(
        trigger="manual"
        placement="bottom-start"
        :x="tagContextMenu.x"
        :y="tagContextMenu.y"
        :show="tagContextMenu.show"
        :options="tagDropdownOptions"
        :on-clickoutside="tagDropDownOnClickoutside"
        @select="tagSelectHandle")

    n-layout-content(:style="layoutStyle" :scrollbar-props="{contentClass: 'layout-content'}" :native-scrollbar="false")
      router-view
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { useRoute } from 'vue-router'
import LayoutHeader from './layout-header.vue'
import LayoutSider from './layout-sider'
import { useTagView, TagView } from './hooks/useTagViews'

defineOptions({ name: 'QianliLayout' })

const route = useRoute()
const {
  tagViews,
  tagViewsMap,
  tagContextMenu,
  tagDropdownOptions,
  currentTag,
  tagHandleContextMenu,
  tagDropDownOnClickoutside,
  tagSelectHandle
} = useTagView()
const layoutStyle: CSSProperties = { height: 'calc(100% - 46px - 60px)' }

watch(
  route,
  function (value) {
    if (!tagViewsMap.value.has(value.name as string)) {
      tagViews.value.push(
        markRaw(
          TagView.create({
            title: value.meta.title!,
            icon: value.meta.icon!,
            name: value.name as string,
            path: value.fullPath
          })
        )
      )
    }
  },
  { immediate: true }
)
</script>

<style lang="less">
.layout-content {
  padding: 24px;
  height: 100%;
  background-color: var(--color-background);
}

.layout-tags-view {
  @apply relative;
  height: 46px;
  padding: 6px 10px;
}

.tags-view {
  @apply flex;
  @apply flex-nowrap;
  column-gap: 5px;
}
</style>
