import { request } from '@/utils/request'

export interface PostListDTO extends AppRequest.List {
  category_id?: number | null
  title?: string | null
}

export interface PostListResponseDTO {
  id: number
  category_name: string
  category_id: number
  date: Date
  created: Date
  updated: Date
  pv: number
  title: string
  desc: string
  img: string
}

export function queryList(data: PostListDTO) {
  return request.post<AppResponse.List<PostListResponseDTO>>('/post/list', data)
}
