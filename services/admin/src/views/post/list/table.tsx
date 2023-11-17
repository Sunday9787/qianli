import { RouterLink } from 'vue-router'
import { NButton, type DataTableColumns, type DataTableColumn, NSpace } from 'naive-ui'
import AppTableWidget from '@/components/app-table-widget/index.vue'
import type { TableWidgetItem } from '@/components/app-table-widget/index.vue'
import type { ResultPostList } from '@/api/post'
import { formatDate } from '@/utils'

interface ColumnAction {
  edit(row: ResultPostList): void
  del(row: ResultPostList): void
}

export function createTableColumns(action: ColumnAction) {
  const columnHead: TableWidgetItem[] = reactive([
    { label: 'No', key: 'no', required: true, enable: true },
    { label: '文章标题', key: 'title', enable: true },
    { label: '发布日期', key: 'date', enable: true },
    { label: '创建日期', key: 'created', enable: true },
    { label: '更新日期', key: 'updated', enable: true }
  ])

  const columnsMap: DataTableColumns<ResultPostList> = [
    {
      title: 'No',
      width: 60,
      key: 'no',
      render(row, index) {
        return <span>{index + 1}</span>
      }
    },
    { title: '文章标题', key: 'title' },
    {
      title: '发布日期',
      key: 'date',
      width: 250,
      render(row: ResultPostList) {
        return formatDate(row.date)
      }
    },
    {
      title: '创建日期',
      key: 'created',
      width: 250,
      render(row) {
        return formatDate(row.created)
      }
    },
    {
      title: '更新日期',
      key: 'updated',
      width: 250,
      render(row) {
        return formatDate(row.updated)
      }
    }
  ]

  const operationColumn: DataTableColumn<ResultPostList> = {
    title() {
      return <AppTableWidget text='操作' data={columnHead} storageKey='post_table_column_config' />
    },
    width: 200,
    key: 'operation',
    render(row: ResultPostList) {
      return (
        <NSpace>
          <RouterLink to={`/post/detail/${row.id}`}>
            <NButton size='small' type='info'>
              查看
            </NButton>
          </RouterLink>
          <RouterLink to={`/post/action?type=edit&id=${row.id}`}>
            <NButton size='small' type='primary'>
              编辑
            </NButton>
          </RouterLink>
          <NButton size='small' type='warning' onClick={() => action.del(row)}>
            删除
          </NButton>
        </NSpace>
      )
    }
  }

  const columns = computed(function () {
    return columnsMap
      .filter(function (item, index) {
        return columnHead[index].enable && item
      })
      .concat(operationColumn)
  })

  return columns
}
