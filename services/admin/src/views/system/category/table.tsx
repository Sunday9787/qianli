import { NButton, type DataTableColumns, NSpace, NTag } from 'naive-ui'
import { CategoryEntity, type CategoryEntityJSON } from '@/service/common.entity'

interface ColumnAction {
  edit(row: CategoryEntityJSON): void
  del(row: CategoryEntityJSON, rowIndex: number): void
}

export function createTableColumns(action: ColumnAction) {
  const columns: DataTableColumns<CategoryEntityJSON> = [
    {
      title: 'No',
      width: 60,
      key: 'no',
      render(row, index) {
        return <span>{index + 1}</span>
      }
    },
    { title: '分类名称', key: 'category_name' },
    {
      title: '分类类型',
      key: 'type',
      render(row) {
        const map = CategoryEntity.typeMap.get(row.type)!
        return <NTag type={map.type}>{map.label}</NTag>
      }
    },
    {
      title: '操作',
      width: 150,
      key: 'operation',
      render(row, index) {
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
