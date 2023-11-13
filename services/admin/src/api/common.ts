import { request } from '@/utils/request'

export interface ResultCategoryList {
  id: number
  category_name: string
  type: 'post' | 'product'
}

export function categoryList() {
  return request.post<ResultCategoryList[]>('/common/category/list')
}
