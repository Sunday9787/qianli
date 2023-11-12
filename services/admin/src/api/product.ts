import { request } from '@/utils/request'

export interface QueryProductList extends AppRequest.List {
  /**产品标题 */
  title?: string
  /** 产品名称 */
  name?: string
  /** 产品分类 */
  category_id?: number
  created_start?: number
  created_end?: number
}

export interface ResultProductList {
  title: string
  name: string
  category_id: number
  category_name: string
  updated: number
  created: number
}

export function productList(data: QueryProductList) {
  return request.post<AppResponse.List<ResultProductList>>('/product/list', data)
}
