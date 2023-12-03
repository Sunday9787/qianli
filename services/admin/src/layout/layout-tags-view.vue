<template lang="pug">
.layout-tags-view
  n-scrollbar.flex-1(ref="scrollbarRef" x-scrollable)
    .tags-view(ref="tagsViewRef")
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
</template>

<script setup lang="ts">
import type { ScrollbarInst } from 'naive-ui'
import { useRoute } from 'vue-router'
import { useTagView, TagView } from './hooks/useTagViews'

defineOptions({ name: 'LayoutTagsView' })

const scrollbarRef = ref<ScrollbarInst>()
const tagsViewRef = ref<HTMLDivElement>()
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
.layout-tags-view {
  @apply flex;
  @apply items-center;
  column-gap: 5px;
  height: 46px;
  padding: 6px 10px;
}

.tags-view {
  @apply flex;
  @apply flex-nowrap;
  column-gap: 5px;
}
</style>
