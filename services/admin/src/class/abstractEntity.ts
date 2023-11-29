import type { AxiosRequestConfig } from 'axios'
import type { UploadCustomRequestOptions } from 'naive-ui'
import { instanceToPlain, plainToInstance, type ClassConstructor } from 'class-transformer'

type ObjectKey<T> = keyof T extends `${infer U}` ? U : string
type AbstractEntityMethodKey = ObjectKey<AbstractEntity> | 'sourceValue'
type EntityMethodKey = ObjectKey<AbstractEntityMethod>
type ExcludeEntityAttribute = EntityMethodKey | AbstractEntityMethodKey
export type EntityQuery<T, Attr = unknown> = Omit<T, ExcludeEntityAttribute & Attr>
export type EntityJSON<T> = Omit<T, ExcludeEntityAttribute>

export interface AbstractEntityMethod {
  /** 添加/更新当前实例 */
  save?(): Promise<null>
  /** 获取实例详情 */
  detail?(): unknown
  process?(): unknown
  logIn?(): unknown
  logOut?(): unknown
  /** 复制 数据到 当前实例 */
  copy?(data: unknown): void
  upload?(option: UploadCustomRequestOptions): void
}

export type AbstractEntityDoUpload = <T extends { ossUrl: string }>(
  data: FormData,
  config?: AxiosRequestConfig
) => Promise<T>

export abstract class AbstractEntity {
  protected sourceValue: EntityJSON<this> = Object.create(null)

  public static toJSON<T extends object>(context: T) {
    return instanceToPlain(context, { excludeExtraneousValues: true }) as EntityJSON<T>
  }

  public static toInstance<T extends object, C>(cls: ClassConstructor<C>, data: T) {
    return plainToInstance(cls, data)
  }

  public static async doUpload(option: UploadCustomRequestOptions, request: AbstractEntityDoUpload) {
    const data = new FormData()
    data.append('file', option.file.file!)

    try {
      const response = await request(data, {
        onUploadProgress({ progress }) {
          option.onProgress({ percent: Math.ceil(progress!) })
        }
      })

      option.file.url = response.ossUrl

      option.onFinish()
    } catch {
      option.onError()
    }
  }

  public init() {
    this.sourceValue = this.toJSON()
  }

  public reset() {
    for (const [key, value] of Object.entries(this.sourceValue)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this[key] = value
    }
  }

  public toJSON() {
    return AbstractEntity.toJSON(this)
  }
}
