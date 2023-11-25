import { NButton, type DataTableColumns, NSpace } from 'naive-ui'
import type { DepartmentEntityJSON } from '@/service/common.entity'

interface ColumnAction {
  edit(row: DepartmentEntityJSON): void
  del(row: DepartmentEntityJSON, rowIndex: number): void
}

export function createTableColumns(action: ColumnAction) {
  const columns: DataTableColumns<DepartmentEntityJSON> = [
    {
      title: 'No',
      width: 60,
      key: 'no',
      render(row, index) {
        return <span>{index + 1}</span>
      }
    },
    { title: '部门名称', key: 'department_name' },
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
