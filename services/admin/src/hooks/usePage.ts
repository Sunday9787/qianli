import { reactive, provide, watch } from 'vue'
import type { PaginationProps } from 'naive-ui'
import { debounce } from 'lodash-es'
import { wait } from '@/utils'

export interface PageContext<T = unknown> {
  pagination: PaginationProps
  table: Page.Table<T>
}

function updateFields(this: Page.SearchFields, ignoreField: string[], form: Record<string, unknown>) {
  for (const [key, value] of Object.entries(form)) {
    if (ignoreField.some(ignoreField => ignoreField === key)) {
      continue
    }

    this[key] = value
  }
}

const defaultOption: Omit<Page.Options<AppRequest.List>, 'request' | 'form'> = {
  wait: 200,
  immediate: true,
  ignoreField: [],
  timeFieldMap: Object.create(null)
}

export function usePage<P extends AppRequest.List, R>(options: Page.Options<P, R>) {
  const opt = Object.assign({}, defaultOption, options) as Required<Page.Options<P, R>>
  const searchFields: Page.SearchFields = Object.create(null)

  const pagination: PaginationProps = reactive({
    size: 'medium',
    page: 1,
    pageSize: 3,
    itemCount: 0,
    pageSizes: [3, 5, 10],
    showSizePicker: true,
    showQuickJumper: true,
    onUpdatePage(page) {
      pagination.page = page
    },
    onUpdatePageSize(pageSize) {
      pagination.pageSize = pageSize
    }
  })

  const table = reactive<Page.Table<R>>({
    loading: true,
    data: []
  })

  const pageContext = { pagination, table } as PageContext<R>
  provide('page', pageContext)

  const search = debounce(function (current?: number) {
    if (typeof current === 'number') {
      const params: AppRequest.List = {
        current: pagination.page,
        size: pagination.pageSize
      }

      updateFields.apply(searchFields, [opt.ignoreField, opt.form])
      fetchData.apply(pageContext, [params])
      return
    }

    if (pagination.page === 1) {
      search(1)
      return
    }

    pagination.page = 1
  }, 300)

  async function fetchData(this: PageContext<R>, params: AppRequest.List) {
    this.table.loading = true

    const data = Object.assign({}, params, searchFields) as P

    try {
      await wait(opt.wait)
      const response = await opt.request(data)
      this.table.data = response.list
      this.pagination.itemCount = response.total
    } finally {
      this.table.loading = false
    }
  }

  if (opt.immediate) {
    search()
  }

  watch(
    () => pagination.page,
    function (val) {
      search(val)
    }
  )

  watch(
    () => pagination.pageSize!,
    function (val) {
      console.log(Math.ceil(pagination.pageCount! / val), pagination.page)
      /**
       * 当前总数 / 新分页条数 = 修改后最大页码
       * 如果小于 当前页码
       * 说明 当前页码需要更新为 修改后最大页码
       * 取消获取数据请求
       * 页码更新
       */
      if (Math.ceil(pagination.pageCount! / val) < pagination.page!) return
      search(pagination.page)
    }
  )

  return {
    pagination,
    table,
    search
  }
}
