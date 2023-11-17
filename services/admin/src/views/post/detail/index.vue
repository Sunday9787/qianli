<template lang="pug">
app-view
  app-card(type="flex" direction="vertical" )
    n-h1 {{ detail.title }}
    n-space
      time(pubdate) 发布时间 {{ formatDate(detail.date) }}
      span 浏览次数 {{ detail.pv }}
    n-hr
    .flex-1.overflow-hidden
      article.post-content.h-full.overflow-y-auto(v-html="detail.content")
</template>

<script lang="ts" setup>
import { useDetail } from '@/views/post/hooks'
import { formatDate } from '@/utils'

interface Props {
  id: number
}

defineOptions({
  name: 'QianliPostDetail',
  beforeRouteEnter(to, from, next) {
    if (to.params.id) return next()
    return next('/404')
  }
})

const props = defineProps<Props>()
const { detail } = useDetail(props.id)
</script>
