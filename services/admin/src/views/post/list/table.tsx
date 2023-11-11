import { NButton, type DataTableColumns, type DataTableColumn, NSpace } from 'naive-ui'
import AppTableWidget from '@/components/app-table-widget/index.vue'
import type { TableWidgetItem } from '@/components/app-table-widget/index.vue'
import type { PostListResponseDTO } from '@/api/post'
import { formatDate } from '@/utils'

interface ColumnAction {
  edit(row: PostListResponseDTO): void
  del(row: PostListResponseDTO): void
}

export function createTableColumns(action: ColumnAction) {
  const columnHead: TableWidgetItem[] = reactive([
    { label: 'No', key: 'no', required: true, enable: true },
    { label: '文章标题', key: 'title', enable: true },
    { label: '发布日期', key: 'date', enable: true },
    { label: '创建日期', key: 'created', enable: true },
    { label: '更新日期', key: 'updated', enable: true }
  ])

  const columnsMap: DataTableColumns<PostListResponseDTO> = [
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
      render(row: PostListResponseDTO) {
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

  const operationColumn: DataTableColumn<PostListResponseDTO> = {
    title() {
      return <AppTableWidget text='操作' data={columnHead} storageKey='post_table_column_config' />
    },
    width: 160,
    key: 'operation',
    render(row: PostListResponseDTO) {
      return (
        <NSpace>
          <NButton size='small' onClick={() => action.edit(row)}>
            编辑
          </NButton>
          <NButton size='small' onClick={() => action.del(row)}>
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
