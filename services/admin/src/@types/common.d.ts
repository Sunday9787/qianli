declare namespace Response {
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

declare namespace Request {
  interface List {
    page?: number
    size?: number
  }
}

declare type FormRule<T> = {
  [k in keyof T]: import('naive-ui').FormItemRule | import('naive-ui').FormItemRule[]
}
