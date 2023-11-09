import type { Component, Plugin } from 'vue'

const components = (function () {
  const result: Component[] = []

  const data: Record<string, { default: Component }> = import.meta.glob(['./**/index.vue', './**/index.tsx'], {
    eager: true
  })

  for (const item of Object.values(data)) {
    result.push(item.default)
  }

  return result
})()

const setup: Plugin = {
  install(vue) {
    components.forEach(item => {
      vue.component(item.name!, item)
    })
  }
}

export default setup
