<template lang="pug">
main.h-full
  app-card.post-content.h-full(v-if="action")
    n-form.h-full.overflow-y-auto(:model="action")
      n-form-item(path="title")
        template(#label)
          n-h2 文章标题
        n-input(v-model:value="action.title")
      n-form-item(path="title")
        template(#label)
          n-h2 文章介绍
        n-input(type="textarea" v-model:value="action.desc")
      n-form-item(path="img")
        template(#label)
          n-h2 文章封面
        n-image(width="500" :src="action.img")
      n-form-item(path="content")
        template(#label)
          n-h2 文章内容
        CKEditor(tagName="article" v-model="action.content" :editor="editor" :config="editorConfig")
      n-form-item
        n-space.flex-1(justify="center")
          n-button(type="primary" @click="save()") 保存
          n-button(@click="cancel()") 返回
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import CKEditor from '@ckeditor/ckeditor5-vue'
import type { EditorConfig } from '@ckeditor/ckeditor5-core'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useAction, type PropsType } from '@/views/post/hooks'

export default defineComponent({
  name: 'QianliPostAction',
  components: {
    CKEditor: CKEditor.component
  },
  props: {
    id: { type: Number as PropType<number>, required: true },
    type: { type: String as PropType<PropsType>, required: true }
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.id && to.query.type) return next()
    return next('/404')
  },
  setup(props) {
    const action = useAction(props)
    const message = useMessage()
    const router = useRouter()

    const editor = ClassicEditor
    const editorConfig: EditorConfig = {
      language: 'zh-cn',
      ckfinder: { uploadUrl: '/api/upload/post', openerMethod: 'modal' }
    }

    async function save() {
      if (!action.value) return

      await action.value.save()

      message.success('保存成功')
      router.go(-1)
    }

    function cancel() {}

    return {
      save,
      cancel,
      action,
      editorConfig,
      editor
    }
  }
})
</script>
