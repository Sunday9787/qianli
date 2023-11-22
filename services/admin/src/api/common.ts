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
  save<T extends QueryCategoryDTO>(data: T) {
    return request.put('/common/category/save', data)
  }
  del(id: number) {
    return request.delete(`/common/category/del/${id}`)
  }
}

export interface DepartmentDTO {
  id: number
  department_name: string
}

export class DepartmentService {
  select() {
    return request.post<DepartmentDTO[]>('/common/department/list')
  }
  save<T extends DepartmentDTO>(data: T) {
    return request.put('/common/department/save', data)
  }
  del(id: number) {
    return request.delete(`/common/department/del/${id}`)
  }
}
