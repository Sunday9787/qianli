import { NButton, type DataTableColumns, NSpace, NImage } from 'naive-ui'
import type { UserEntityJSON } from '@/service/user.entity'
import { formatDate } from '@/utils'

interface ColumnAction {
  edit(row: UserEntityJSON): void
  del(row: UserEntityJSON, rowIndex: number): void
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
      title: '头像',
      key: 'avatar',
      render(row) {
        if (row.avatar) {
          return <NImage src={row.avatar} width={80} height={80} objectFit='cover' />
        }
      }
    },
    { title: '用户名', key: 'username' },
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
      render(row, rowIndex) {
        return (
          <NSpace>
            <NButton size='small' type='primary' onClick={() => action.edit(row)}>
              编辑
            </NButton>
            <NButton size='small' type='warning' onClick={() => action.del(row, rowIndex)}>
              删除
            </NButton>
          </NSpace>
        )
      }
    }
  ]

  return columns
}
