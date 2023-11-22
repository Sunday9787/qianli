<template lang="pug">
app-card.h-full
  n-h1 部门配置

  app-data-view
    app-table-container
      template(#action)
        n-space(justify="end" :wrap-item="false")
          n-button(type="primary" @click="modal.action('action:visible')") 添加部门

      n-data-table.h-full(:data="table.data" :loading="table.loading" :columns="columns")

n-modal(v-model:show="modal.visible" transform-origin="center" @after-leave="department.reset()")
  n-card(:title="modal.title" style="width: 600px")
    n-form(ref="formRef" :model="department" :rules="formRule" :label-width="80")
      n-form-item(label="部门名称" path="department_name")
        n-input(v-model:value="department.department_name")
    template(#footer)
      n-space(justify="end")
        n-button(type="primary" @click="modal.action('action:submit')") 确认
        n-button(@click="modal.action('action:hidden')") 取消
</template>

<script lang="ts" setup>
import type { FormInst } from 'naive-ui'
import { useModal } from '@/hooks/useModal'
import { DepartmentEntity } from './entity'
import { createTableColumns } from './table'

defineOptions({ name: 'QianliSystemDepartment' })

const department = shallowReactive(new DepartmentEntity())

const formRef = ref<FormInst>()
const formRule: FormRule<Pick<DepartmentEntity, 'department_name'>> = {
  department_name: { required: true, message: '请输入部门名称' }
}

const message = useMessage()
const dialog = useDialog()
const modal = useModal({
  label: '部门',
  async submit() {
    if (!formRef.value) {
      throw new Error('form 实例未找到')
    }

    await formRef.value.validate()
    await department.save()
    query()
  }
})

const table = reactive<Page.Table<DepartmentEntity>>({
  data: [],
  loading: true
})

const columns = createTableColumns({
  del(row, rowIndex) {
    dialog.warning({
      title: '提示',
      transformOrigin: 'center',
      content: `确认删除【${row.department_name}】 部门？`,
      positiveText: '确认',
      negativeText: '取消',
      async onPositiveClick() {
        await row.del()
        table.data.splice(rowIndex, 1)
        message.success('删除成功')
      }
    })
  },
  edit(row) {
    modal.mode = 'update'
    department.id = row.id
    department.department_name = row.department_name

    modal.action('action:visible')
  }
})

async function query() {
  table.data = await department.select()
  table.loading = false
}
query()
</script>
