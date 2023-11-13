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

export function queryList(data: QueryPostList) {
  return request.post<AppResponse.List<ResultPostList>>('/post/list', data)
}
