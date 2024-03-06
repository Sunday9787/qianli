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

defineOptions({ name: 'QianliError' })

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
  height: 100%;
  min-height: 500px;
  padding-bottom: 10%;

  @apply justify-center;
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
  font-size: 72px;
  font-weight: 600;
  line-height: 72px;
  color: #515a6e;
}

.error-message-desc {
  margin-bottom: 16px;
  font-size: 20px;
  line-height: 28px;
  color: #808695;
}
</style>
