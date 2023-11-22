import { NButton, type DataTableColumns, NSpace } from 'naive-ui'
import type { DepartmentEntity } from './entity'

interface ColumnAction {
  edit(row: DepartmentEntity): void
  del(row: DepartmentEntity, rowIndex: number): void
}

export function createTableColumns(action: ColumnAction) {
  const columns: DataTableColumns<DepartmentEntity> = [
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
