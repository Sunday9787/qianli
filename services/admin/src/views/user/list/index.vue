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
          n-button(type="primary" @click="modal.action('action:visible')") 添加用户

      n-data-table.h-full(
        flex-height
        remote
        :pagination="pagination"
        :data="table.data"
        :columns="columns"
        :loading="table.loading")

n-modal(v-model:show="modal.visible" transform-origin="center" @after-leave="user.reset()")
  n-card(:title="modal.title" style="width: 600px")
    n-form(ref="formRef" :model="user" :rules="formRule" :label-width="80" label-placement="left")
      n-form-item(label="用户名" path="username")
        n-input(v-model:value="user.username")
      n-form-item(label="头像" path="avatar")
        n-upload(
          :accept="ACCEPT.picture"
          :max="1"
          :custom-request="user.upload"
          v-model:file-list="coversUser"
          list-type="image-card") 点击上传
      n-form-item(label="邮箱" path="email")
        n-input(v-model:value="user.email")
      n-form-item(label="密码" path="password")
        n-input(v-model:value="user.password" type="password" show-password-on="click")
    template(#footer)
      n-space(justify="end")
        n-button(type="primary" @click="modal.action('action:submit')") 确认
        n-button(@click="modal.action('action:hidden')") 取消
</template>

<script lang="ts" setup>
import type { FormInst, UploadFileInfo } from 'naive-ui'
import { usePage } from '@/hooks/usePage'
import { UserEntity } from '@/service/user.entity'
import { useModal } from '@/hooks/useModal'
import { ACCEPT } from '@/utils/constant'
import { createTableColumns } from './table'

defineOptions({ name: 'QianliUserIndex' })

const user = shallowReactive(new UserEntity())

const coversUser = ref<UploadFileInfo[]>([])
const form = reactive(UserEntity.form())
const { table, pagination, search, mapper, reset } = usePage({
  request: UserEntity.select,
  timeFieldMap: {
    createdDate: ['created_start', 'created_end']
  },
  form
})

const formRef = ref<FormInst>()
const formRule: FormRule<Pick<UserEntity, 'avatar' | 'email' | 'password' | 'username'>> = {
  avatar: { required: false },
  email: { required: true, message: '请输入邮箱地址' },
  password: { required: true, message: '请输入密码' },
  username: { required: true, message: '请输入用户名' }
}

const message = useMessage()
const dialog = useDialog()
const modal = useModal({
  label: '用户',
  close() {
    coversUser.value.splice(0, 1)
  },
  async submit() {
    if (!formRef.value) {
      throw new Error('form 实例未找到')
    }

    const [avatar] = coversUser.value
    user.avatar = avatar.url!

    await formRef.value.validate()
    await user.save()
    search()
  }
})

const columns = createTableColumns({
  edit(row) {
    user.copy(row)
    coversUser.value.push({ url: row.avatar, id: String(row.id), name: row.avatar, status: 'finished' })
    modal.mode = 'update'
    modal.action('action:visible')
  },
  del(row, rowIndex) {
    dialog.warning({
      title: '提示',
      transformOrigin: 'center',
      content: `确认删除【${row.username}】 用户？`,
      positiveText: '确认',
      negativeText: '取消',
      async onPositiveClick() {
        await UserEntity.del(row.id)
        table.data.splice(rowIndex, 1)
        message.success('删除成功')
      }
    })
  }
})
</script>
