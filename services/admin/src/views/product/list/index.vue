<template lang="pug">
app-view
  app-card
    n-form(inline :model="form" :show-feedback="false" label-placement="left" :label-width="80")
      n-form-item(label="产品标题" path="title")
        n-input(v-model:value="form.title" clearable)
      n-form-item(label="产品名称" path="name")
        n-input(v-model:value="form.name" clearable)
      n-form-item(label="创建时间" path="created_start")
        n-date-picker(v-model:value="mapper.createdDate" type="daterange" clearable)

      n-space
        n-button(type="primary" @click="search()") 搜索
        n-button(attr-type="reset") 重置

  app-data-view
    app-table-container
      template(#action)
        n-space(justify="end" :wrap-item="false")
          n-button(type="primary") 导出

      n-data-table(
        style="height: 100%;"
        flex-height
        remote
        :pagination="pagination"
        :data="table.data"
        :columns="columns"
        :loading="table.loading")
</template>

<script lang="ts" setup>
import { productList, type QueryProductList } from '@/api/product'
import { usePage } from '@/hooks/usePage'
import { createTableColumns } from './table'

defineOptions({ name: 'QianliProductIndex' })

const form = reactive<QueryProductList>({
  title: undefined,
  name: undefined,
  category_id: undefined,
  created_start: undefined,
  created_end: undefined
})

const { table, pagination, search, mapper } = usePage({
  request: productList,
  timeFieldMap: {
    createdDate: ['created_start', 'created_end']
  },
  form
})

const columns = createTableColumns({
  edit(row) {
    console.log('edit', row)
  },
  del(row) {
    console.log('del', row)
  }
})
</script>
