import type { PostEntity } from '@/views/post/entity'
import { request } from '@/utils/request'

export interface QueryPostList extends AppRequest.List {
  category_id?: number
  title?: string
  created_start?: number
  created_end?: number
}

export interface ResultPostList {
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

export function postList(data: QueryPostList) {
  return request.post<AppResponse.List<ResultPostList>>('/post/list', data)
}

export interface QueryPostDTO {
  id: number
  category_id: number
  title: string
  desc: string
  content: string
  img: string
}

export function postAdd(data: QueryPostDTO) {
  return request.put('/post/add', data)
}

export interface ResultPostDetail extends QueryPostDTO {
  category_name: string
  id: number
  /** 发布时间 */
  date: string
  /** 浏览量 */
  pv: number
  /** 创建时间 */
  created: string
  /** 更新时间 */
  updated: string
}

export function postDetail(id: number) {
  return request.post<ResultPostDetail>(`/post/${id}`)
}

export class PostServer {
  detail(id: number) {
    return request.post<PostEntity>(`/post/${id}`)
  }

  save<T extends QueryPostDTO>(data: T) {
    return request.put('/post/save', data)
  }

  del(id: number) {
    return request.post(`/post/del/${id}`)
  }
}
