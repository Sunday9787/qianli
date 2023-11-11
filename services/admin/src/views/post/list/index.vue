<template lang="pug">
app-view
  app-card
    n-form(inline :model="form" :show-feedback="false" label-placement="left" :label-width="80")
      n-form-item(label="文章标题" path="title")
        n-input(v-model:value="form.title")

      n-button(type="primary" @click="search()") 搜索

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
import { type PostListDTO, queryList } from '@/api/post'
import { usePage } from '@/hooks/usePage'
import { createTableColumns } from './table'

defineOptions({ name: 'QianliProductIndex' })

const form = reactive<PostListDTO>({ category_id: null, title: '' })
const { table, pagination, search } = usePage({ request: queryList, form })

const columns = createTableColumns({
  edit(row) {
    console.log('edit', row)
  },
  del(row) {
    console.log('del', row)
  }
})
</script>
