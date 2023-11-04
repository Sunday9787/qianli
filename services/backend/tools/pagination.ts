export interface PaginationConfig {
  /**
   * 总记录数
   */
  total: number
  /**
   * 当前页码
   */
  current: number
  /**
   * 每页显示条数
   */
  pageSize?: number
  /**
   * 页面中隐藏的页码 最大数量
   * 左右分别计算
   */
  perPages?: number
  /**
   * 分页跳转的url路径
   */
  baseURL: string
}

export class QianliPagination {
  /**
   * 当前页码
   */
  public current: number
  /**
   *总记录数
   */
  public total: number
  /**
   * 每页显示条数
   */
  public pageSize: number

  /**
   * 页面中隐藏的页码 最大数量
   * 左右分别计算
   */
  public perPages: number

  /**
   * 分页跳转的url路径
   */
  public baseURL: string

  constructor(config: PaginationConfig) {
    this.total = config.total
    this.current = config.current
    this.pageSize = config.pageSize || 10
    this.perPages = config.perPages || 5
    this.baseURL = config.baseURL
  }

  /**
   *总页数
   *
   * @readonly
   * @memberof Pagination
   */
  get total_page() {
    return Math.ceil(this.total / this.pageSize)
  }

  /**
   * 当前页 数据总数
   */
  get size() {
    if (this.current * this.pageSize > this.total) {
      const pageSize = this.pageSize - (this.current * this.pageSize - this.total)
      return pageSize <= 0 ? 0 : pageSize
    }
    return this.pageSize
  }

  get showPrevMore() {
    return this.current - this.perPages > 1
  }

  get showNextMore() {
    return this.total_page - this.perPages > this.current
  }

  get pagers() {
    let left = 0
    let right = 0
    const result: number[] = []

    if (this.current - this.perPages > 1) {
      left = this.current - this.perPages
    } else {
      left = 2
    }

    if (this.current + this.perPages < this.total_page) {
      right = this.current + this.perPages
    } else {
      right = this.total_page - 1
    }

    while (left <= right) {
      result.push(left)
      left++
    }
    return result
  }

  get prevPage() {
    if (this.current === 1) {
      return 'javascript:;'
    }

    return this.transformURL(this.current - 1)
  }

  get nextPage() {
    if (this.current === this.total_page) {
      return 'javascript:;'
    }
    return this.transformURL(this.current + 1)
  }

  public transformURL(pager: number) {
    return this.baseURL.replace(/\$pager/gi, String(pager))
  }
}
