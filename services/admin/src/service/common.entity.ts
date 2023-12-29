import type { AbstractEntityMethod, EntityJSON } from '@/class/abstractEntity'
import type { UploadCustomRequestOptions } from 'naive-ui'
import { md5 } from 'js-md5'
import { has } from 'lodash-es'
import { Expose } from 'class-transformer'
import { AbstractEntity } from '@/class/abstractEntity'
import {
  CategoryService,
  DepartmentService,
  UploadFileChunkService,
  type UploadFileChunkFile,
  type ResultChunkFileProcess
} from './common.service'

export type CategoryEntityJSON = EntityJSON<CategoryEntity>

export class CategoryEntity extends AbstractEntity implements AbstractEntityMethod {
  private static readonly service = new CategoryService()

  public static typeMap = new Map<
    CategoryEntity['type'],
    { type: 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'; label: string }
  >([
    ['post', { label: '文章分类', type: 'primary' }],
    ['product', { label: '产品分类', type: 'info' }]
  ])

  static select() {
    return CategoryEntity.service.select()
  }

  static del(id: number) {
    return CategoryEntity.service.del(id)
  }

  @Expose() id = 0
  @Expose() category_name!: string
  @Expose() type!: 'product' | 'post'

  save() {
    return CategoryEntity.service.save(this.toJSON())
  }

  copy(data: CategoryEntityJSON) {
    this.id = data.id
    this.category_name = data.category_name
    this.type = data.type
  }
}

export type DepartmentEntityJSON = EntityJSON<DepartmentEntity>

export class DepartmentEntity extends AbstractEntity implements AbstractEntityMethod {
  private static readonly service = new DepartmentService()

  static select() {
    return DepartmentEntity.service.select()
  }

  static del(id: number) {
    return DepartmentEntity.service.del(id)
  }

  @Expose() id = 0
  @Expose() department_name!: string

  save() {
    return DepartmentEntity.service.save(this.toJSON())
  }

  copy(data: DepartmentEntityJSON) {
    this.id = data.id
    this.department_name = data.department_name
  }
}

export namespace UploadFileChunk {
  export interface FileChunk {
    /** 文件名 */
    name: string
    /** chunk 哈希值 */
    hash: string
    /** chunk 下标 */
    index: number
    /** chunk 总数 */
    total: number
    /** 文件大小 */
    size: number
    chunk: File
  }

  const service = new UploadFileChunkService()

  function isProcessData(data: UploadFileChunkFile): data is ResultChunkFileProcess {
    return has(data, 'process')
  }

  function chunk(file: File, start: number, end: number) {
    return new File([file.slice(start, end)], encodeURIComponent(file.name))
  }

  function createHash(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.addEventListener('load', event => {
        const value = md5(event.target?.result as ArrayBuffer)
        resolve(value)
      })

      reader.addEventListener('error', event => {
        console.log(event)
        reject(new Error('file 转 ArrayBuffer 失败'))
      })

      reader.readAsArrayBuffer(blob)
    })
  }

  export async function createChunk(file: File) {
    /**
     * 默认每个 chunk 8mb 大小
     */
    const chunkSize = 8 * 1024 ** 2
    const chunkTotal = Math.ceil(file.size / chunkSize)
    const data: FileChunk[] = []

    let chunkOffset = 1

    while (chunkOffset <= chunkTotal) {
      const end = chunkOffset * chunkSize
      const start = (chunkOffset - 1) * chunkSize

      data.push({
        hash: '',
        name: encodeURIComponent(file.name),
        size: file.size,
        index: chunkOffset,
        total: chunkTotal,
        chunk: chunk(file, start, end)
      })

      chunkOffset++
    }

    await Promise.all(
      data.map(async function (item) {
        const hash = await createHash(item.chunk)
        item.hash = hash
      })
    )

    return data
  }

  export async function uploadQueue(data: FileChunk[], options: UploadCustomRequestOptions) {
    let next = Promise.resolve()
    const total = data.length

    const queue = function (index: number) {
      if (index > total - 1) return

      next = next.then(function () {
        options.onProgress({ percent: (index / total) * 100 })
        return service.upload(data[index]).then(function (response) {
          if (isProcessData(response)) {
            queue(index + 1)
          } else {
            options.file.url = response.ossUrl
            options.onFinish()
          }
        })
      })
    }

    queue(0)
  }
}
