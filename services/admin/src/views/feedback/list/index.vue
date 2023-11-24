<template lang="pug">
app-view
  app-card
    app-form-collapse
      n-form.app-form(:model="form" :show-feedback="false" label-placement="left" :label-width="80" @keyup.enter="search()")
        n-form-item(label="用户名" path="name")
          n-input(v-model:value="form.name" clearable)
        n-form-item(label="联系方式" path="contact")
          n-input(v-model:value="form.contact" clearable)
        n-form-item(label="地区" path="area")
          n-input(v-model:value="form.area" clearable)
        n-form-item(label="留言" path="message")
          n-input(v-model:value="form.message" clearable)

      template(#action)
        n-button(type="primary" @click="search()") 搜索
        n-button(attr-type="reset" @click="reset()") 重置

  app-data-view
    app-table-container
      n-data-table.h-full(
        flex-height
        remote
        :pagination="pagination"
        :data="table.data"
        :columns="columns"
        :loading="table.loading")
</template>

<script lang="ts" setup>
import { usePage } from '@/hooks/usePage'
import { FeedbackEntity } from '@/views/feedback/entity'
import { createTableColumns } from './table'

defineOptions({ name: 'QianliFeedback' })

const message = useMessage()
const form = reactive(FeedbackEntity.form)
const { table, pagination, search, reset } = usePage({ request: FeedbackEntity.select, form })
const columns = createTableColumns({
  async process(row) {
    await FeedbackEntity.process(row.id)
    search()
    message.success('处理完成')
  }
})
</script>
