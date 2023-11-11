declare namespace AppResponse {
  interface Body<T> {
    code: number
    message: string
    data: Data<T>
  }

  type Data<T> = T extends Blob ? { blob: Blob; filename: string } : T

  interface List<T> {
    total: number
    page: number
    size: number
    list: T[]
  }
}

declare namespace AppRequest {
  interface List {
    current?: number
    size?: number
  }
}

declare type FormRule<T> = {
  [k in keyof T]: import('naive-ui').FormItemRule | import('naive-ui').FormItemRule[]
}

declare namespace Page {
  type RequestFunction<P extends AppRequest.List, R> = (param: P) => Promise<AppResponse.List<R>>

  interface Options<P extends AppRequest.List, R = unknown> {
    wait?: number
    request: RequestFunction<P, R>
    /** @default true */
    immediate?: boolean
    /** 查询忽略字段 */
    ignoreField?: string[]
    /** 时间范围字段映射 */
    timeFieldMap?: Record<string, [string, string]>
    form: Record<string, unknown>
  }

  type SearchFields = Record<string, unknown>

  interface Table<T> {
    loading: boolean
    data: T[]
  }

  interface Pagination {
    layout: string
    total: number
    current: number
    limit: number
  }
}
