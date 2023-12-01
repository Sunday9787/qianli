import { type EntityJSON, AbstractEntity } from '@/class/abstractEntity'
import type { Component, DefineComponent } from 'vue'
import type { DropdownOption } from 'naive-ui'
import { useRoute } from 'vue-router'
import router from '@/router'

export type TagViewJSON = EntityJSON<TagView>

export class TagView {
  public static create<T extends TagViewJSON>(data: T) {
    return AbstractEntity.toInstance(TagView, data)
  }

  public static del(this: TagContext, tags?: TagView[]) {
    if (!tags) return

    let nextTag: TagView | null = null
    let deleteTagIndex = 0

    for (const tag of tags) {
      const [index] = this.tagViewsMap.value.get(tag.name)!

      deleteTagIndex = index

      this.tagViews.value.splice(index, 1)
    }

    /**
     * 如果删除的是当前 tag 那么 currentTag 必定是 undefined
     * 删除当前 tag 首先找 左边一个 tag 如 未找到 则 寻找右边一个 tag
     */
    if (this.currentTag.value === void 0) {
      // 首先取左边一个 tag
      nextTag = this.tagViews.value[deleteTagIndex - 1]

      // 如果不存在 且 tagViews > 1个 则 取 被删除的 deleteTagIndex 新 tag
      if (!nextTag && this.tagViews.value.length >= 1) {
        nextTag = this.tagViews.value[deleteTagIndex]
      }
    }

    if (nextTag) {
      router.replace(nextTag.path)
    }
  }

  path!: string
  title!: string
  name!: string
  icon?: DefineComponent | Component
  show? = false
}

type HandleType = 'closeCurrent' | 'closeLeft' | 'closeRight' | 'closeOther'
type TagViewsMap = Map<string, [number, TagView]>
type TagContext = { tagViewsMap: Ref<TagViewsMap>; tagViews: Ref<TagView[]>; currentTag: ComputedRef<TagView | void> }

export function useTagView() {
  const route = useRoute()

  const tagViews = ref<TagView[]>([])

  const tagViewsMap = computed<TagViewsMap>(function () {
    return new Map(tagViews.value.map((item, index) => [item.name, [index, item]]))
  })

  const currentTag = computed<TagView | void>(function () {
    for (const item of tagViews.value) {
      if (route.name === item.name) return item
    }
  })

  const tagSelectView = ref<TagView>()

  const tagsLeft = computed<TagView[]>(function () {
    if (!currentTag.value) return []
    const [currentIndex] = tagViewsMap.value.get(currentTag.value.name)!
    return tagViews.value.filter(function (item, index) {
      return index < currentIndex
    })
  })

  const tagsRight = computed<TagView[]>(function () {
    if (!currentTag.value) return []
    const [currentIndex] = tagViewsMap.value.get(currentTag.value.name)!
    return tagViews.value.filter(function (item, index) {
      return index > currentIndex
    })
  })

  const otherTags = computed<TagView[]>(function () {
    if (!currentTag.value) return []
    return tagViews.value.filter(item => item !== currentTag.value)
  })

  const tagContextMenu = reactive({ x: 0, y: 0, show: false })

  const tagDropdownOptions = ref<DropdownOption[]>([
    { label: '关闭标签页', key: 'closeCurrent', show: true },
    { label: '关闭左边标签页', key: 'closeLeft', show: true },
    { label: '关闭右边标签页', key: 'closeRight', show: true },
    { label: '关闭其他标签页', key: 'closeOther', show: true }
  ])

  const dropdownOptionsMap = computed(function () {
    return new Map(
      tagDropdownOptions.value.map(function (item) {
        return [item.key as HandleType, item]
      })
    )
  })

  const context: TagContext = { tagViews, tagViewsMap, currentTag }

  function tagHandleContextMenu(e: MouseEvent, tag: TagView) {
    tagContextMenu.show = false
    tagSelectView.value = tag

    const menuCloseCurrent = dropdownOptionsMap.value.get('closeCurrent')!
    const menuCloseLeft = dropdownOptionsMap.value.get('closeLeft')!
    const menuCloseRight = dropdownOptionsMap.value.get('closeRight')!
    const menuCloseOther = dropdownOptionsMap.value.get('closeOther')!

    menuCloseCurrent.show = tagViews.value.length > 1
    menuCloseLeft.show = hasMenuLeft(tag) && tag === currentTag.value
    menuCloseRight.show = hasMenuRight(tag) && tag === currentTag.value
    menuCloseOther.show = tagViews.value.length > 1 && tag === currentTag.value

    nextTick(function () {
      tagContextMenu.show = true
      tagContextMenu.x = e.clientX
      tagContextMenu.y = e.clientY
    })
  }

  function tagDropDownOnClickoutside() {
    tagContextMenu.show = false
  }

  function tagSelectHandle(handleType: HandleType) {
    const tagView = tagSelectView.value

    switch (handleType) {
      case 'closeCurrent':
        TagView.del.call(context, tagView && [tagView])
        break
      case 'closeLeft':
        TagView.del.call(context, tagsLeft.value)
        break
      case 'closeRight':
        TagView.del.call(context, tagsRight.value)
        break
      case 'closeOther':
        TagView.del.call(context, otherTags.value)
        break
    }

    tagContextMenu.show = false
  }

  function hasMenuLeft(tag: TagView) {
    return tag !== tagViews.value[0]
  }

  function hasMenuRight(tag: TagView) {
    return tag !== tagViews.value.at(-1)
  }

  return {
    tagViews,
    tagViewsMap,
    currentTag,
    tagContextMenu,
    tagDropdownOptions,
    tagSelectHandle,
    tagDropDownOnClickoutside,
    tagHandleContextMenu
  }
}
