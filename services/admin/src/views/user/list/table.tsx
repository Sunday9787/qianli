import { NButton, type DataTableColumns, NSpace } from 'naive-ui'
import type { UserEntityJSON } from '@/service/user.entity'
import { formatDate } from '@/utils'

interface ColumnAction {
  edit(row: UserEntityJSON): void
  del(row: UserEntityJSON): void
}

export function createTableColumns(action: ColumnAction) {
  const columns: DataTableColumns<UserEntityJSON> = [
    {
      title: 'No',
      width: 60,
      key: 'no',
      render(row, index) {
        return <span>{index + 1}</span>
      }
    },
    {
      title: '用户名',
      key: 'username'
    },
    { title: '邮箱', key: 'email' },
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
      render(row) {
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
  ]

  return columns
}
