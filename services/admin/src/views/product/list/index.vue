<template lang="pug">
app-view
  app-card
    app-form-collapse
      n-form.app-form(:model="form" :show-feedback="false" label-placement="left" :label-width="80" @keyup.enter="search()")
        n-form-item(label="产品标题" path="title")
          n-input(v-model:value="form.title" clearable)
        n-form-item(label="产品名称" path="name")
          n-input(v-model:value="form.name" clearable)
        n-form-item(label="产品分类" path="category_id")
          n-select(
            style="width: 204px;"
            v-model:value="form.category_id"
            label-field="category_name"
            value-field="id"
            clearable
            :options="cacheModule.optionsProductCategory")
        n-form-item(label="创建时间" path="created_start")
          n-date-picker(v-model:value="mapper.createdDate" type="daterange" clearable)

      template(#action)
        n-button(type="primary" @click="search()") 搜索
        n-button(attr-type="reset" @click="reset()") 重置

  app-data-view
    app-table-container
      template(#action)
        n-space(justify="end" :wrap-item="false")
          router-link(to='/product/action')
            n-button(type="primary") 添加
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
import { ProductEntity } from '@/service/product.entity'
import { useCacheModule } from '@/store/modules/cache'
import { usePage } from '@/hooks/usePage'
import { createTableColumns } from './table'

defineOptions({ name: 'QianliProductIndex' })

const message = useMessage()
const dialog = useDialog()
const cacheModule = useCacheModule()
const form = reactive(ProductEntity.from())

const { table, pagination, search, mapper, reset } = usePage({
  request: ProductEntity.select,
  timeFieldMap: {
    createdDate: ['created_start', 'created_end']
  },
  form
})

const columns = createTableColumns({
  del(row, rowIndex) {
    dialog.warning({
      title: '提示',
      transformOrigin: 'center',
      content: `确认删除【${row.title}】 产品？`,
      positiveText: '确认',
      negativeText: '取消',
      async onPositiveClick() {
        await ProductEntity.del(row.id)
        table.data.splice(rowIndex, 1)
        message.success('删除成功')
      }
    })
  }
})
</script>
