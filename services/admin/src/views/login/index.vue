<template lang="pug">
.login-container
  h1.login-title Login

  n-form.login-form(ref="formRef" label-placement="left" :model="form" :rules="formRule" :label-width="80")
    n-form-item(label="用户名" path="username" :theme-overrides="{labelTextColor: '#fff'}")
      n-input(v-model:value="form.username" placeholder="请输入用户名")

    n-form-item(label="密码" path="password" :theme-overrides="{labelTextColor: '#fff'}")
      n-input(type="password" v-model:value="form.password" placeholder="请输入密码")

    n-form-item
      .flex.flex-1.justify-center
        n-button(type="primary" @click="login()") 登录
</template>

<script lang="ts" setup>
import type { FormInst } from 'naive-ui'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { UserDTO } from '@/api/user'
import { useUserModule } from '@/store/modules/user'

defineOptions({
  name: 'QianliLogin'
})

const form = ref(new UserDTO())
const formRef = ref<FormInst>()
const router = useRouter()
const userModule = useUserModule()

const formRule: FormRule<UserDTO> = {
  username: { required: true, message: '请输入用户名' },
  password: { required: true, message: '请输入密码' }
}

async function login() {
  await formRef.value?.validate()
  await userModule.logIn(form.value)
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
