<template lang="pug">
app-view
  app-card
    n-form(inline :model="form" :show-feedback="false" label-placement="left" :label-width="80")
      n-form-item(label="用户名" path="username")
        n-input(v-model:value="form.username" clearable)
      n-form-item(label="用户邮箱" path="email")
        n-input(v-model:value="form.email" clearable)

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
import { userList, type QueryUserList } from '@/api/user'
import { usePage } from '@/hooks/usePage'
import { createTableColumns } from './table'

defineOptions({ name: 'QianliUserIndex' })

const form = reactive<QueryUserList>({ username: '', email: '' })
const { table, pagination, search } = usePage({ request: userList, form })

const columns = createTableColumns({
  edit(row) {
    console.log('edit', row)
  },
  del(row) {
    console.log('del', row)
  }
})
</script>
