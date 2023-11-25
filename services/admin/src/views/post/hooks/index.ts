import { plainToInstance } from 'class-transformer'
import { PostEntity } from '@/service/post.entity'

export type PropsType = 'edit' | 'add' | 'detail'

interface ActionProps {
  id: number
  type: PropsType
}

export function usePost(props: ActionProps) {
  const post = ref(new PostEntity(props.id))

  if (props.type !== 'add') {
    post.value.detail().then(function (response) {
      console.log('response', response)
      post.value = plainToInstance(PostEntity, response)
    })
  }

  return post
}
