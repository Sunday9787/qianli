<template lang="pug">
app-card.h-full
  n-h1 分类配置

  app-data-view
    app-table-container
      template(#action)
        n-space(justify="end" :wrap-item="false")
          n-button(type="primary" @click="modal.action('action:visible')") 添加分类

      n-data-table.h-full(:data="table.data" :loading="table.loading" :columns="columns")

n-modal(v-model:show="modal.visible" transform-origin="center" @after-leave="category.reset()")
  n-card(:title="modal.title" style="width: 600px")
    n-form(ref="formRef" :model="category" :rules="formRule" :label-width="80")
      n-form-item(label="分类名称" path="category_name")
        n-input(v-model:value="category.category_name")
      n-form-item(label="分类类型" path="type")
        n-radio-group(v-model:value="category.type")
          n-radio(value="product") 产品
          n-radio(value="post") 文章
    template(#footer)
      n-space(justify="end")
        n-button(type="primary" @click="modal.action('action:submit')") 确认
        n-button(@click="modal.action('action:hidden')") 取消
</template>

<script lang="ts" setup>
import type { FormInst } from 'naive-ui'
import { CategoryEntity, type CategoryEntityJSON } from '@/service/common.entity'
import { useCacheModule } from '@/store/modules/cache'
import { useModal } from '@/hooks/useModal'
import { createTableColumns } from './table'

defineOptions({ name: 'QianliSystemCategory' })

const cacheModule = useCacheModule()
const category = shallowReactive(new CategoryEntity())

const formRef = ref<FormInst>()
const formRule: FormRule<Pick<CategoryEntity, 'category_name' | 'type'>> = {
  category_name: { required: true, message: '请输入分类名称' },
  type: { required: true, message: '请选择分类类型' }
}

const message = useMessage()
const dialog = useDialog()
const modal = useModal({
  label: '分类',
  async submit() {
    if (!formRef.value) {
      throw new Error('form 实例未找到')
    }

    await formRef.value.validate()
    await category.save()
    query()
    modal.action('action:hidden')
  }
})

const table = reactive<Page.Table<CategoryEntityJSON>>({
  get data() {
    return cacheModule.categoryList
  },
  loading: false
})

const columns = createTableColumns({
  del(row, rowIndex) {
    dialog.warning({
      title: '提示',
      transformOrigin: 'center',
      content: `确认删除【${row.category_name}】 分类？`,
      positiveText: '确认',
      negativeText: '取消',
      async onPositiveClick() {
        await CategoryEntity.del(row.id)
        table.data.splice(rowIndex, 1)
        message.success('删除成功')
      }
    })
  },
  edit(row) {
    category.copy(row)
    modal.mode = 'update'
    modal.action('action:visible')
  }
})

async function query() {
  table.loading = true
  await cacheModule.cacheCategory()
  table.loading = false
}
query()
</script>
