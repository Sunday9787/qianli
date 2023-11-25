import { NButton, type DataTableColumns, NSpace, NTag } from 'naive-ui'
import { FeedbackEntity, type FeedbackEntityJSON } from '@/service/feedback.entity'

interface ColumnAction {
  process(row: FeedbackEntityJSON): void
}

export function createTableColumns(action: ColumnAction) {
  const columns: DataTableColumns<FeedbackEntityJSON> = [
    {
      title: 'No',
      width: 60,
      key: 'no',
      render(row, index) {
        return <span>{index + 1}</span>
      }
    },
    { title: '用户名', key: 'name', width: 150 },
    { title: '联系方式', key: 'contact', width: 150 },
    { title: '地区', key: 'area', width: 200 },
    { title: '留言', key: 'message' },
    {
      title: '状态',
      key: 'status',
      width: 150,
      render(row) {
        const map = FeedbackEntity.statusMap.get(row.status)!
        return <NTag type={map.type}>{map.label}</NTag>
      }
    },
    {
      title: '操作',
      width: 120,
      key: 'operation',
      render(row) {
        if (row.status === 0) {
          return (
            <NSpace>
              <NButton size='small' type='primary' onClick={() => action.process(row)}>
                处理
              </NButton>
            </NSpace>
          )
        }
      }
    }
  ]

  return columns
}
