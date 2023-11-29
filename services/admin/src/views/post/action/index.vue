<template lang="pug">
main.h-full
  app-card.post-content.h-full(v-if="post")
    n-form.h-full.overflow-y-auto(:model="post")
      n-form-item(path="title")
        template(#label)
          n-h2 文章标题
        n-input(v-model:value="post.title")
      n-form-item(path="category_id")
        template(#label)
          n-h2 文章分类
        n-select(v-model:value="post.category_id" :options="cacheModule.optionsPostCategory" labelField="category_name" valueField="id")
      n-form-item(path="desc")
        template(#label)
          n-h2 文章介绍
        n-input(type="textarea" v-model:value="post.desc")
      n-form-item(path="img")
        template(#label)
          n-h2 文章封面
        n-upload(
          :max="1"
          :accept="ACCEPT.picture"
          v-model:file-list="covers"
          :custom-request="post.upload"
          list-type="image-card") 点击上传
      n-form-item(path="content")
        template(#label)
          n-h2 文章内容
        .flex-1
          CKEditor(tagName="article" v-model="post.content" :editor="editor" :config="editorConfig" @ready="onReady")
      n-form-item
        n-space.flex-1(justify="center")
          n-button(type="primary" @click="save()") 保存
          n-button(@click="cancel()") 返回
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { UploadFileInfo } from 'naive-ui'
import { useRouter } from 'vue-router'
import CKEditor from '@ckeditor/ckeditor5-vue'
import type { EditorConfig } from '@ckeditor/ckeditor5-core'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useCacheModule } from '@/store/modules/cache'
import { UploadPostAdapter } from './uploadAdapter'
import { usePost } from '@/views/post/hooks'
import { ACCEPT } from '@/utils/constant'
import { watchOnce } from '@vueuse/core'

export default defineComponent({
  name: 'QianliPostAction',
  components: {
    CKEditor: CKEditor.component
  },
  props: {
    id: { type: Number as PropType<number>, required: true },
    type: { type: String as PropType<Utils.ActionType>, required: true }
  },
  beforeRouteEnter(to, _from, next) {
    if (to.query.type === 'add') return next()

    if (to.query.id && to.query.type) return next()
    return next('/404')
  },
  setup(props) {
    const post = usePost(props)
    const message = useMessage()
    const router = useRouter()
    const cacheModule = useCacheModule()

    const editor = ClassicEditor
    const editorConfig: EditorConfig = {
      language: 'zh-cn'
    }

    const covers = ref<UploadFileInfo[]>([])

    watch(covers, function ([value]) {
      post.value.img = value ? value.url! : ''
    })

    watchOnce(
      () => post.value.img,
      function (val) {
        if (val) {
          covers.value.push({
            id: 'cover',
            name: 'cover',
            url: val,
            status: 'finished',
            fullPath: val
          })
        }
      }
    )

    async function save() {
      if (!post.value) return

      await post.value.save()

      message.success('保存成功')
      router.go(-1)
    }

    function cancel() {
      router.back()
    }

    function onReady(editor: ClassicEditor) {
      editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
        return new UploadPostAdapter(loader)
      }
    }

    return {
      ACCEPT,
      covers,
      cacheModule,
      save,
      cancel,
      onReady,
      post,
      editorConfig,
      editor
    }
  }
})
</script>
