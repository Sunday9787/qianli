import type { ProductEntityJSON, ProductQueryEntity } from './product.entity'
import type { EntityQuery } from '@/class/abstractEntity'
import { AbstractService } from '@/class/abstractService'
import { request } from '@/utils/request'

export class ProductService extends AbstractService {
  readonly baseURL = '/product'

  select(data: EntityQuery<ProductQueryEntity & AppRequest.List>) {
    return request.post<AppResponse.List<ProductEntityJSON>>(this.baseURL + '/list', data)
  }

  save(data: ProductEntityJSON) {
    return request.put(this.baseURL + '/save', data)
  }

  del(id: number) {
    return request.delete(this.baseURL + `/${id}`)
  }

  detail(id: number) {
    return request.post<ProductEntityJSON>(this.baseURL + `/${id}`)
  }
}
