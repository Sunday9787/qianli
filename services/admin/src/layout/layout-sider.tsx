import { NMenu, NLayoutSider, type MenuOption } from 'naive-ui'
import { RouterLink, useRoute, useRouter, type RouteRecordRaw } from 'vue-router'

function buildMenu(data: ReadonlyArray<RouteRecordRaw>, baseKey: string): MenuOption[] {
  const result: MenuOption[] = []

  for (const item of data) {
    if (!item.meta) continue
    if (item.meta.hidden) continue

    const menu: MenuOption = {
      label() {
        return <RouterLink to={baseKey.concat(item.path)}>{item.meta?.title}</RouterLink>
      },
      icon: item.meta?.icon,
      key: baseKey.concat(item.path)
    }

    result.push(menu)

    if (item.meta.noShowingChildren) continue
    if (item.children) {
      const children = buildMenu(item.children, menu.key as string)
      if (children.length) menu.children = children
    }
  }

  return result
}

export default defineComponent({
  name: 'QianliLayoutSider',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const menuOptions = computed(() => {
      return buildMenu(router.options.routes, '')
    })

    const activeMenu = computed(() => {
      return route.meta.activeMenu!
    })

    return { activeMenu, menuOptions }
  },
  render() {
    return (
      <NLayoutSider contentStyle={{ padding: '24px' }} showTrigger nativeScrollbar={false} bordered>
        <NMenu value={this.activeMenu} collapsedWidth={64} collapsedIconSize={22} options={this.menuOptions}></NMenu>
      </NLayoutSider>
    )
  }
})
