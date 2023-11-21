import { NButton, type DataTableColumns, NSpace } from 'naive-ui'
import type { CategoryEntity } from './entity'

interface ColumnAction {
  edit(row: CategoryEntity): void
  del(row: CategoryEntity, rowIndex: number): void
}

export function createTableColumns(action: ColumnAction) {
  const columns: DataTableColumns<CategoryEntity> = [
    {
      title: 'No',
      width: 60,
      key: 'no',
      render(row, index) {
        return <span>{index + 1}</span>
      }
    },
    { title: '分类名称', key: 'category_name' },
    { title: '分类类型', key: 'type' },
    {
      title: '操作',
      width: 150,
      key: 'operation',
      render(row: CategoryEntity, index) {
        return (
          <NSpace>
            <NButton size='small' type='primary' onClick={() => action.edit(row)}>
              编辑
            </NButton>
            <NButton size='small' type='warning' onClick={() => action.del(row, index)}>
              删除
            </NButton>
          </NSpace>
        )
      }
    }
  ]

  return columns
}
