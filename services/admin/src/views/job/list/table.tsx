import { NButton, type DataTableColumns, NSpace, NTag } from 'naive-ui'
import { JobEntity, type JobEntityJSON } from '@/service/job.entity'
import { useCacheModule } from '@/store/modules/cache'
import { formatDate } from '@/utils'

interface ColumnAction {
  view(row: JobEntityJSON): void
  edit(row: JobEntityJSON): void
  del(row: JobEntityJSON, rowIndex: number): void
}

export function createTableColumns(action: ColumnAction) {
  const cacheModule = useCacheModule()

  const columns: DataTableColumns<JobEntityJSON> = [
    {
      title: 'No',
      width: 60,
      key: 'no',
      render(row, index) {
        return <span>{index + 1}</span>
      }
    },
    { title: '职位标题', key: 'title' },
    { title: '招聘人数', key: 'num' },
    {
      title: '招聘部门',
      key: 'department_id',
      render(row) {
        return cacheModule.departmentMap.get(row.department_id)?.department_name
      }
    },
    {
      title: '职位状态',
      key: 'status',
      render(row) {
        const map = JobEntity.statusMap.get(row.status)!
        return <NTag type={map.type}>{map.label}</NTag>
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
    },
    {
      title: '操作',
      width: 200,
      key: 'operation',
      render(row, rowIndex) {
        return (
          <NSpace>
            <NButton size='small' type='info' onClick={() => action.view(row)}>
              查看
            </NButton>
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
