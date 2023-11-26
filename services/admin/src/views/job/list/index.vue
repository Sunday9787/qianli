<template lang="pug">
app-view
  app-card
    app-form-collapse
      n-form.app-form(:model="form" :show-feedback="false" label-placement="left" :label-width="80" @keyup.enter="search()")
        n-form-item(label="职位标题" path="title")
          n-input(v-model:value="form.title" clearable)
        n-form-item(label="招聘部门" path="department_id")
          n-select(
            style="width: 204px;"
            v-model:value="form.department_id"
            label-field="department_name"
            value-field="id"
            clearable
            :options="cacheModule.departmentList")
        n-form-item(label="职位状态" path="status")
          n-select(
            style="width: 204px;"
            v-model:value="form.status"
            label-field="label"
            value-field="id"
            clearable
            :options="JobEntity.statusOptions")
        n-form-item(label="创建时间" path="created_start")
          n-date-picker(v-model:value="mapper.createdDate" type="daterange" clearable)

      template(#action)
        n-button(type="primary" @click="search()") 搜索
        n-button(attr-type="reset" @click="reset()") 重置

  app-data-view
    app-table-container
      template(#action)
        n-space(justify="end" :wrap-item="false")
          n-button(type="primary" @click="modal.action('action:visible')") 添加职位

          n-button(type="primary") 导出

      n-data-table.h-full(
        flex-height
        remote
        :pagination="pagination"
        :data="table.data"
        :columns="columns"
        :loading="table.loading")

n-modal(v-model:show="modal.visible" transform-origin="center" @after-leave="job.reset()")
  n-card(:title="modal.title" style="width: 600px")
    n-form(ref="formRef" :disabled="modal.disabled" :model="job" :rules="formRule" :label-width="80")
      n-form-item(label="职位名称" path="title")
        n-input(v-model:value="job.title" clearable)
      n-form-item(label="招聘人数" path="num")
        n-input-number(v-model:value="job.num" :min="1" clearable)
      n-form-item(label="招聘城市" path="city")
        n-input(v-model:value="job.city" clearable)
      n-form-item(label="招聘部门" path="department_id")
        n-select(
          style="width: 204px;"
          v-model:value="job.department_id"
          label-field="department_name"
          value-field="id"
          clearable
          :options="cacheModule.departmentList")
      n-form-item(label="任职要求" path="requirement")
        n-input(v-model:value="job.requirement" type="textarea" :rows="5" :maxlength="1000" clearable)
      n-form-item(label="岗位职责" path="responsibility")
        n-input(v-model:value="job.responsibility" type="textarea" :rows="5" :maxlength="1000" clearable)
    template(#footer)
      n-space(justify="end")
        n-button(type="primary" @click="modal.action('action:submit')" v-if="!modal.disabled") 确认
        n-button(@click="modal.action('action:hidden')") 取消
</template>

<script lang="ts" setup>
import type { FormInst } from 'naive-ui'
import { JobEntity } from '@/service/job.entity'
import { useCacheModule } from '@/store/modules/cache'
import { usePage } from '@/hooks/usePage'
import { useModal } from '@/hooks/useModal'
import { createTableColumns } from './table'

defineOptions({ name: 'QianliJobIndex' })

const message = useMessage()
const dialog = useDialog()
const cacheModule = useCacheModule()
const form = reactive(JobEntity.form())
const { table, pagination, search, mapper, reset } = usePage({
  request: JobEntity.select,
  timeFieldMap: {
    createdDate: ['created_start', 'created_end']
  },
  form
})

const job = shallowReactive(new JobEntity())
const formRef = ref<FormInst>()
const formRule: FormRule<Pick<JobEntity, 'title' | 'department_id' | 'requirement' | 'responsibility'>> = {
  title: { required: true, message: '请输入岗位名称' },
  department_id: { required: true, message: '请选择招聘部门' },
  requirement: { required: true, message: '请输入任职要求' },
  responsibility: { required: true, message: '请输入岗位职责' }
}

const modal = useModal({
  label: '职位',
  async submit() {
    if (!formRef.value) {
      throw new Error('form 实例未找到')
    }

    await formRef.value.validate()
    await job.save()
    search()
  }
})

const columns = createTableColumns({
  view(row) {
    job.copy(row)
    modal.mode = 'view'
    modal.action('action:visible')
  },
  edit(row) {
    job.copy(row)
    modal.mode = 'update'
    modal.action('action:visible')
  },
  del(row, rowIndex) {
    dialog.warning({
      title: '提示',
      transformOrigin: 'center',
      content: `确认删除【${row.title}】 职位？`,
      positiveText: '确认',
      negativeText: '取消',
      async onPositiveClick() {
        await JobEntity.del(row.id)
        table.data.splice(rowIndex, 1)
        message.success('删除成功')
      }
    })
  }
})
</script>
