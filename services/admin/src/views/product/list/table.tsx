import { NButton, type DataTableColumns, NSpace } from 'naive-ui'
import type { ProductEntityJSON } from '@/service/product.entity'
import { formatDate } from '@/utils'

interface ColumnAction {
  edit(row: ProductEntityJSON): void
  del(row: ProductEntityJSON, rowIndex: number): void
}

export function createTableColumns(action: ColumnAction) {
  const columns: DataTableColumns<ProductEntityJSON> = [
    {
      title: 'No',
      width: 60,
      key: 'no',
      render(row, index) {
        return <span>{index + 1}</span>
      }
    },
    { title: '产品分类', key: 'category_name' },
    { title: '产品标题', key: 'title' },
    { title: '产品名称', key: 'name' },
    {
      title: '创建日期',
      key: 'created',
      render(row) {
        return formatDate(row.created)
      }
    },
    {
      title: '更新日期',
      key: 'updated',
      render(row) {
        return formatDate(row.updated)
      }
    },
    {
      title: '操作',
      key: 'operation',
      width: 200,
      render(row, rowIndex) {
        return (
          <NSpace>
            <NButton size='small' onClick={() => action.edit(row)}>
              编辑
            </NButton>
            <NButton size='small' onClick={() => action.del(row, rowIndex)}>
              删除
            </NButton>
          </NSpace>
        )
      }
    }
  ]

  return columns
}
