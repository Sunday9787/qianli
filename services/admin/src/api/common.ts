import { request } from '@/utils/request'
import type { CategoryEntity } from '@/views/system/category/entity'

export interface ResultCategoryList {
  id: number
  category_name: string
  type: 'post' | 'product'
}

export function categoryList() {
  return request.post<ResultCategoryList[]>('/common/category/list')
}

export interface ResultUploadPostFile {
  uploaded: number
  ossUrl: string
}

export function uploadPostFile(data: FormData) {
  return request.post<ResultUploadPostFile>('/upload/post/image', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export interface QueryCategoryDTO {
  id: number
  category_name: string
  type: 'post' | 'product'
}

export class CategoryService {
  select() {
    return request.post<CategoryEntity[]>('/common/category/list')
  }
  create<T extends QueryCategoryDTO>(data: T) {
    return request.put('/common/category/add', data)
  }
  save<T extends QueryCategoryDTO>(data: T) {
    return request.post('/common/category/add', data)
  }
  del(id: number) {
    return request.delete(`/common/category/del/${id}`)
  }
}
