<template lang="pug">
app-view
  app-card
    app-form-collapse
      n-form.app-form(:model="form" :show-feedback="false" label-placement="left" :label-width="80")
        n-form-item(label="文章标题" path="title")
          n-input(v-model:value="form.title" clearable)
        n-form-item(label="文章分类" path="category_id")
          n-select(
            style="width: 204px;"
            v-model:value="form.category_id"
            label-field="category_name"
            value-field="id"
            clearable
            :options="cacheModule.optionsPostCategory")
        n-form-item(label="创建时间" path="created_start")
          n-date-picker(v-model:value="mapper.createdDate" type="daterange" clearable)

      template(#action)
        n-button(type="primary" @click="search()") 搜索
        n-button(attr-type="reset" @click="reset()") 重置

  app-data-view
    app-table-container
      template(#action)
        n-space(justify="end" :wrap-item="false")
          router-link(to="/post/action?type=add")
            n-button(type="primary") 添加文章

          n-button(type="primary") 导出

      n-data-table.h-full(
        flex-height
        remote
        :pagination="pagination"
        :data="table.data"
        :columns="columns"
        :loading="table.loading")
</template>

<script lang="ts" setup>
import { type QueryPostList, postList } from '@/api/post'
import { usePage } from '@/hooks/usePage'
import { useCacheModule } from '@/store/modules/cache'
import { createTableColumns } from './table'

defineOptions({ name: 'QianliProductIndex' })

const cacheModule = useCacheModule()
const form = reactive<QueryPostList>({
  category_id: void 0,
  created_start: void 0,
  created_end: void 0,
  title: ''
})
const { table, pagination, search, mapper, reset } = usePage({
  request: postList,
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
