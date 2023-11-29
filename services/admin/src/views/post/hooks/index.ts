import { PostEntity } from '@/service/post.entity'

export function usePost(props: Utils.ActionProps) {
  const post = ref(new PostEntity(props.id))

  if (props.type !== 'add') {
    post.value.detail().then(function (response) {
      post.value = PostEntity.toInstance(PostEntity, response)
    })
  }

  return post
}
