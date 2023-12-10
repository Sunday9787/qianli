import type { CategoryEntityJSON, DepartmentEntityJSON, UploadFileChunk } from './common.entity'
import type { AxiosRequestConfig } from 'axios'
import { AbstractService } from '@/class/abstractService'
import { request } from '@/utils/request'

export interface ResultUploadFile {
  uploaded: number
  ossUrl: string
}

export function uploadPostFile(data: FormData, config?: AxiosRequestConfig) {
  return request.post<ResultUploadFile>('/upload/post/image', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...config
  })
}

export function uploadProductImage(data: FormData, config?: AxiosRequestConfig) {
  return request.post<ResultUploadFile>('/upload/product/image', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...config
  })
}

class CommonService extends AbstractService {
  readonly baseURL = '/common'
}

export class CategoryService extends CommonService {
  select() {
    return request.post<CategoryEntityJSON[]>(this.baseURL + '/category/list')
  }
  save(data: CategoryEntityJSON) {
    return request.put(this.baseURL + '/category/save', data)
  }
  del(id: number) {
    return request.delete(this.baseURL + `/category/del/${id}`)
  }
}

export class DepartmentService extends CommonService {
  select() {
    return request.post<DepartmentEntityJSON[]>(this.baseURL + '/department/list')
  }
  save(data: DepartmentEntityJSON) {
    return request.put(this.baseURL + '/department/save', data)
  }
  del(id: number) {
    return request.delete(this.baseURL + `/department/del/${id}`)
  }
}

export interface ResultChunkFileProcess {
  process: number
}

export type UploadFileChunkFile = ResultChunkFileProcess | ResultUploadFile

export class UploadFileChunkService {
  upload(data: UploadFileChunk.FileChunk) {
    return request.post<UploadFileChunkFile>('/upload/file', data, {
      timeout: 60 * 1000,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
