<template lang="pug">
.error-container
  .error-img
    app-icon(:name="String(status)" :size="['430', '360']")
  .error-message
    h1.error-message-title {{ status }}
    p.error-message-desc {{ errorMessage.message }}
    .error-message-action
      router-link(to="/")
        n-button(type="primary") 返回首页
</template>

<script lang="ts" setup>
interface Props {
  status: 403 | 404
}

const props = defineProps<Props>()

const dataMap = new Map([
  [403, { message: '抱歉，你无权访问该页面' }],
  [404, { message: '抱歉，你访问的页面不存在' }]
])
const errorMessage = computed(() => dataMap.get(props.status)!)
</script>

<style lang="less">
.error-container {
  display: flex;
  align-items: center;
  @apply justify-center;
  height: 100%;
  padding-bottom: 10%;
  min-height: 500px;
}

.error-img {
  @apply flex;
  @apply justify-end;
  padding-right: 152px;
}

.error-content {
  flex: auto;
}

.error-message-title {
  margin-bottom: 24px;
  color: #515a6e;
  font-weight: 600;
  font-size: 72px;
  line-height: 72px;
}

.error-message-desc {
  margin-bottom: 16px;
  color: #808695;
  font-size: 20px;
  line-height: 28px;
}
</style>
