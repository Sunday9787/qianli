<template lang="pug">
n-popover(trigger="click" placement="bottom")
  template(#trigger)
    .table-widget-head
      span.table-widget-head__text(v-if="text") {{ text }}
      n-tooltip(trigger="hover")
        template(#trigger)
          n-icon(size="18")
            SettingsAccessibilityRound
        span 操作可以自定义设置

  template(#header)
    .table-widget__title
      span 表格设置
      a(href="javascript:;" class="table-widget__reset" @click="reset()") 恢复默认

  ul.table-widget
    ol.table-widget__item(v-for="item of data" :key="item.key")
      .table-widget__label
        .table-widget__icon
          app-svg-icon(name="table-widget" :size="[6,22]")
        .table-widget__text {{ item.label }}
      n-switch(v-model:value="item.enable" size="small" :disabled="item.required" :on-update-value="updateConfig")
</template>

<script lang="ts" setup>
import { SettingsAccessibilityRound } from '@vicons/material'

export interface TableWidgetItem {
  label: string
  key: string
  required?: boolean
  enable: boolean
}

interface Props {
  text?: string
  data: TableWidgetItem[]
  storageKey: string
}

const props = defineProps<Props>()
defineOptions({ name: 'app-table-widget' })

initConfig()

/**
 * 初始化 table prop 配置
 */
function initConfig() {
  /**
   * @type {string|undefined}
   */
  const config = localStorage.getItem(props.storageKey)

  if (!config) return

  /**
   * @type {[]unknown}
   */
  const data = JSON.parse(config) as TableWidgetItem[]

  for (const item of props.data) {
    const dataItem = data.find(d => d.key === item.key)
    if (dataItem) item.enable = dataItem.enable
  }
}

/**
 * 重置 tableWidget
 */
function reset() {
  for (const item of props.data) {
    item.enable = true
  }

  updateConfig()
}

function updateConfig() {
  localStorage.setItem(props.storageKey, JSON.stringify(props.data))
}
</script>

<style lang="less">
.table-widget {
  max-height: 300px;
  user-select: none;

  &__reset {
    color: var(--color-primary);
  }

  &__label {
    display: flex;
    align-items: center;
  }

  &__icon {
    display: inline-block;
    width: 8px;
    height: 24px;
    margin-right: 6px;
    line-height: 24px;
    color: inherit;
    border-radius: 4px;
  }

  &__title {
    @apply flex;
    @apply items-center;
    @apply justify-between;

    height: 32px;
    padding-right: 14px;
    padding-left: 10px;
    line-height: 32px;
    user-select: none;
  }

  &__item {
    @apply flex;
    @apply items-center;
    @apply justify-between;

    height: 32px;
    padding-right: 14px;
    padding-left: 10px;
    line-height: 32px;
    border-radius: 6px;
    transition-duration: 0.2s;

    &:hover {
      background-color: var(--color-background);
    }

    &:not(:first-of-type) {
      margin-top: 10px;
    }
  }

  &__text {
    width: 100px;
    margin-right: 30px;

    @apply line-clamp-1;
  }
}

.table-widget-head {
  display: flex;
  align-items: center;
  cursor: default;

  &__text {
    margin: 0 8px 0 10px;
  }
}
</style>
