<template lang="pug">
app-view
  app-card
    app-form-collapse
      n-form.app-form(:model="form" :show-feedback="false" label-placement="left" :label-width="80" @keyup.enter="search()")
        n-form-item(label="用户名" path="username")
          n-input(v-model:value="form.username" clearable)
        n-form-item(label="用户邮箱" path="email")
          n-input(v-model:value="form.email" clearable)
        n-form-item(label="创建时间" path="created_start")
          n-date-picker(v-model:value="mapper.createdDate" type="daterange" clearable)

      template(#action)
        n-button(type="primary" @click="search()") 搜索
        n-button(attr-type="reset" @click="reset()") 重置

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
import { usePage } from '@/hooks/usePage'
import { createTableColumns } from './table'
import { UserEntity } from '@/service/user.entity'

defineOptions({ name: 'QianliUserIndex' })

const form = reactive(UserEntity.form())
const { table, pagination, search, mapper, reset } = usePage({
  request: UserEntity.select,
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
