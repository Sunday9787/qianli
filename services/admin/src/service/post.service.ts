import type { PostEntity, PostEntityJSON, PostQueryEntity } from './post.entity'
import type { EntityQuery } from '@/class/abstractEntity'
import { AbstractService } from '@/class/abstractService'
import { request } from '@/utils/request'

export interface QueryPostList {
  category_id?: number
  title?: string
  created_start?: number
  created_end?: number
}

export class PostServer extends AbstractService {
  baseURL = '/post'

  select(data: EntityQuery<PostQueryEntity & AppRequest.List>) {
    return request.post<AppResponse.List<PostEntityJSON>>(this.baseURL + '/list', data)
  }

  detail(id: number) {
    return request.post<PostEntity>(this.baseURL + `/${id}`)
  }

  save(data: PostEntityJSON) {
    return request.put('/post/save', data)
  }

  del(id: number) {
    return request.post(`/post/del/${id}`)
  }
}
