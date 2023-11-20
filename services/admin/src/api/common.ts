import { request } from '@/utils/request'

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
