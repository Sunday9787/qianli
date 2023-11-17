import { plainToInstance } from 'class-transformer'
import { postDetail, type ResultPostDetail } from '@/api/post'
import { PostActionAddDTO, PostActionEditDTO } from '@/views/post/action/action.dto'

export function useDetail(id: number) {
  const detail = ref<ResultPostDetail>({
    id: 0,
    category_id: 0,
    title: '',
    desc: '',
    content: '',
    category_name: '',
    img: '',
    date: '',
    pv: 0,
    created: '',
    updated: ''
  })

  postDetail(id).then(function (response) {
    detail.value = response
  })

  return { detail }
}

export type PropsType = 'edit' | 'add'

export interface ActionProps {
  id: number
  type: PropsType
}

export function useAction(props: ActionProps) {
  const actionInstance = ref<PostActionAddDTO | PostActionEditDTO | null>(null)

  if (props.type === 'add') {
    actionInstance.value = new PostActionAddDTO()
  } else {
    postDetail(props.id).then(function (response) {
      actionInstance.value = plainToInstance(PostActionEditDTO, response, { excludeExtraneousValues: true })
    })
  }

  return actionInstance
}
