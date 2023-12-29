import type { ProductItemEntity } from '@/service/product.item.entity'
import { NButton, type DataTableColumns, NSpace } from 'naive-ui'
import { RouterLink } from 'vue-router'

interface ColumnAction {
  del(row: ProductItemEntity, rowIndex: number): void
}

export function createTableColumns(action: ColumnAction) {
  const columns: DataTableColumns<ProductItemEntity> = [
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
    { title: '创建日期', key: 'created' },
    { title: '更新日期', key: 'updated' },
    {
      title: '操作',
      key: 'operation',
      width: 200,
      render(row, rowIndex) {
        return (
          <NSpace>
            <RouterLink to={`/product/detail/${row.id}`}>
              <NButton type='primary' size='small'>
                查看
              </NButton>
            </RouterLink>
            <RouterLink to={`/product/action?type=edit&id=${row.id}`}>
              <NButton type='info' size='small'>
                编辑
              </NButton>
            </RouterLink>
            <NButton type='warning' size='small' onClick={() => action.del(row, rowIndex)}>
              删除
            </NButton>
          </NSpace>
        )
      }
    }
  ]

  return columns
}
