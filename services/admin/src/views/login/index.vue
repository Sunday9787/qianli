<template lang="pug">
.login-container
  h1.login-title Login

  n-form.login-form(ref="formRef" label-placement="left" :model="form" :rules="formRule" :label-width="80" @keyup.enter="login()")
    n-form-item(label="邮箱" path="email")
      n-input(v-model:value="form.email" placeholder="请输入邮箱")

    n-form-item(label="密码" path="password")
      n-input(type="password" v-model:value="form.password" placeholder="请输入密码")

    n-form-item
      .flex.flex-1.justify-center
        n-button(type="primary" @click="login()") 登录
</template>

<script lang="ts" setup>
import type { FormInst } from 'naive-ui'
import { useRouter } from 'vue-router'
import { UserAuthEntity, type UserAuthEntityJSON } from '@/service/user.entity'
import { useUserModule } from '@/store/modules/user'

interface Props {
  redirect?: string
}

defineOptions({ name: 'QianliLogin' })
const props = defineProps<Props>()

const router = useRouter()
const userModule = useUserModule()
const formRef = ref<FormInst>()
const form = reactive(new UserAuthEntity()) as UserAuthEntity

const formRule: FormRule<UserAuthEntityJSON> = {
  email: { required: true, message: '请输入邮箱' },
  password: { required: true, message: '请输入密码' }
}

async function login() {
  await formRef.value?.validate()
  await userModule.logIn(form)

  if (props.redirect) {
    router.replace(props.redirect)
    return
  }

  router.replace('/dashboard')
}
</script>

<style lang="less">
.login-container {
  @apply flex;
  @apply min-h-full;
  @apply flex-col;
  @apply px-6;
  @apply py-10;
  @apply lg:px-8;
  @apply bg-slate-800;
}

.login-title {
  margin-top: 16vh;
  @apply text-white;
  @apply text-center;
  @apply text-2xl;
  @apply font-bold;
  @apply leading-9;
  @apply tracking-tight;
}

.login-form {
  @apply mt-10;
  @apply sm:mx-auto;
  @apply sm:w-full;
  @apply sm:max-w-sm;
}
</style>
